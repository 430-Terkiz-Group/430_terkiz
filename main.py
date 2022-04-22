import datetime

from flask import Flask, abort, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_marshmallow import Marshmallow
from flask import request
from flask import jsonify
from flask_session import Session
from flask_mail import Mail, Message
import os
import jwt

SECRET_KEY = "b'|\xe7\xbfU3`\xc4\xec\xa7\xa9zf:}\xb5\xc7\xb9\x139^3@Dv'"
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'Project_DB.db')
app.secret_key = "b'|\xe7\xbfU3`\xc4\xec\xa7\xa9zf:}\xb5\xc7\xb9\x139^3@Dv'"
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SESSION_REFRESH_EACH_REQUEST'] = False
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(app)
app.config['SESSION_SQLALCHEMY'] = db

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'terkiz.club@gmail.com'
app.config['MAIL_PASSWORD'] = 'terkiz123'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
Email = Mail(app)

from .model.item import Item, ItemSchema
from .model.user import User, UserSchema
from .model.ticket import Ticket
from .model.match import Match, MatchSchema
from .model.staff import Admin, AdminSchema

CORS(app, supports_credentials=True, withCredentials=True)
Session(app)

# metadata required for creating table in sqlite, should not use anymore since db is already created LEAVE IT
# AS I am not sure
meta = MetaData()
# same as meta data

# userstable = Table('users', meta, Column('id', Integer, primary_key=True, autoincrement=True),
#                    Column('username', String, unique=True), Column('password', String), Column('mail', String),
#                    Column('dob', String), Column('gender', String), Column('date_joined', String))
# itemstable = Table('items', meta, Column('id', Integer, primary_key=True, autoincrement=True),
#                    Column('name', String), Column('price', String), Column('stockleft', Integer),
#                    Column('kind', String), Column('sale', db.Boolean), Column('size', String))
# ticketstable = Table('tickets', meta, Column('id', Integer, primary_key=True, autoincrement=True),
#                      Column('price', String), Column('ticketsleft', Integer), Column('sector', Integer),
#                      Column('vip', db.String), Column('match', String), Column('competition', String))

# for afif, use string for dates that are inputted manually so that no issue arise when using sqlite GOTIT
# matchestable = Table('matches', meta, Column('id', Integer, primary_key=True, autoincrement=True),
#                      Column('opponent', String), Column('result_terkiz', Integer), Column('result_opponent', Integer),
#                      Column('home', Integer), Column('match_type', String), Column('date_played', String))

staffTable = Table('admins', meta, Column('id', Integer, primary_key=True, autoincrement=True),
                    Column('username', String, unique=True), Column('password', String), Column('mail', String),
                    Column('dob', String), Column('gender', String), Column('date_joined', String), Column('position' , String),
                    Column('phone', String))


matches_schema = MatchSchema(many=True)
user_schema = UserSchema(many=True)
staff_schema = StaffSchema(many=True)
item_schema = ItemSchema(many=True)


# api to add item to db
# expects json file with price, stockleft, kind, sale, size
@app.route('/add_item', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_item():
    nom = request.json['name']
    pri = request.json['price']
    stock = request.json['stockleft']
    kind = request.json['kind']
    sale = request.json['sale']
    size = request.json['size']
    if not pri or not stock or not kind or not sale or not size:
        # empty fields
        abort(400)
    newitem = Item(nom, pri, stock, kind, sale, size)
    db.session.add(newitem)
    db.session.commit()
    return "Item Added"


# OLD CODE FOR CART NOT BEING USED
# # remove/add items from the cart
# @app.route('/update_cart', methods=['POST'])
# @cross_origin(supports_credentials=True)
# # expects item added + qtty
# def update_cart():
#     # need to check if cart dictionary exists first in session
#     item_id = request.json["id"]
#     qtty = request.json["qtty"]
#     exists = False
#     if "token" in session:
#         if session["token"]:
#             if "cart" not in session:
#                 # create cart to store temporarily items in session
#                 session["cart"]={}
#                 session["cart"][item_id]=qtty
#             else:  # cart is alreadsy there, check if item already in cart, if yes just add/substract the qtty, else create new entry in session storage
#                 for id in session["cart"]:
#                     if id == item_id:
#                         session["cart"][id] += qtty
#                         exists = True
#                         break
#                 if (exists == False):  # create new entry
#                     session["cart"][item_id] = qtty
#                 return jsonify({"item":item_id,"qtty":qtty})
#
#
#         else:
#             abort(403)
#     else:
#         abort(403)
#
# #api to get all items for sale
#
#
#
#
# # api to get items added to cart by id
# # makes use of
# @app.route('/get_items', methods=['GET'])
# def get_item():
#     # check if token is in session dictionary
#     if ("token" in session):
#         # check if token is not null in case user logged out
#         if (session["token"]):
#             # here user is logged in and we will return the items he has bought
#
#             if ("cart" in session):  # check if cart exists
#                 item_ids = []
#                 qtty = []
#                 for id in session["cart"]:  # GET IDS oof items + qtty
#                     item_ids.append(item_ids)
#                     qtty.append(session)
#                 # now fetch items and store them in list
#
#                 # get list of items whos ids are in the list above
#                 item = Item.query.filter_by(Item.id.in_(item_ids)).all()
#                 #create dictionary to return
#                 dicto={}
#                 increment =0
#                 for i in item:
#                     #create a temp dictionary to add to main one to be returned
#                     name = i.name
#                     price = i.price
#                     kind = i.kind
#                     size = i.size
#                     quantity = qtty[i]
#                     temp ={"name":name,"price":price,"kind":kind,"size":size,"quantity":quantity}
#                     dicto[i]=temp
#                     increment +=1
#                 #now return main dictionry
#                 return jsonify(dicto)
#
#
#
#
#
#
#
#             else:
#                 abort(400)  # no items added in cart
#
#
#
#
#
#
#
#         else:
#             abort(403)
#     else:
#         abort(403)


@app.route('/get_all_items', methods=['GET'])
def get_all_items():
    items = Item.query.all()
    success = jsonify(item_schema.dump(items))
    return success


@app.route('/view_matches', methods=['GET'])
def view_matches():
    lastFiveMatches = Match.query.order_by(Match.date_played.desc()).limit(5).all()
    return jsonify(matches_schema.dump(lastFiveMatches))


@app.route('/view_tickets', methods=['GET'])
def view_tickets():
    my_id = request.json["id"]
    ticket = Ticket.query.filter_by(id=my_id).first()
    x = {
        "price": ticket.price,
        "ticketsleft": ticket.ticketsleft,
        "sector": ticket.sector,
        "id": ticket.id,
        "vip": ticket.vip,
        "match": ticket.match,
        "competition": ticket.competition
    }
    return jsonify(x)


@app.route('/add_ticket', methods=['POST'])
def add_ticket():  # t_index,price,ticketsleft,sector,vip,match,competition

    pri = request.json['price']
    ticks = request.json['ticketsleft']
    sector = request.json['sector']
    vip = request.json['vip']
    match = request.json['match']
    compete = request.json['competition']
    newticket = Ticket(pri, ticks, sector, vip, match, compete)
    db.session.add(newticket)
    db.session.commit()
    return "Ticket Added"


# api to add user to db
# expects json file with username , password , mail , dob and gender fields create time is automatic
@app.route('/add_user', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_user():
    name = request.json['username']
    pwd = request.json['password']
    mail = request.json['mail']
    dob = request.json['dob']
    gender = request.json['gender']
    if not name or not pwd or not dob or not mail:
        # name is empty or pwd is empty
        abort(400)
    # check for unique name
    not_unique = User.query.filter_by(username=name).first()
    # similar username exists
    if not_unique:
        abort(403)
    else:
        newuser = User(name, pwd, mail, dob, gender)
        db.session.add(newuser)
        db.session.commit()

        return "success"


@app.route('/view_info', methods=['POST'])
@cross_origin(supports_credentials=True)
def view_info():
    if request.json["token"] is None:
        abort(403)
    my_id = decode_token(request.json["token"])
    user = User.query.filter_by(id=my_id).first()
    x = {
        "username": user.username,
        "mail": user.mail,
        "dob": user.dob,
        "id": user.id,
        "date_joined": user.date_joined,
        "gender": user.gender
    }

    return jsonify(x)


# api to authenticate user on log in
# expects username and password
# returns token
@app.route('/authentication', methods=['POST'])
def authenticate():
    usname = request.json['username']
    pwd = request.json['password']
    if not id or not pwd:
        abort(400)
    user_db = User.query.filter_by(username=usname).first()
    # no username exists
    if user_db is None:
        abort(403)
    # password don't match
    if not bcrypt.check_password_hash(user_db.password, pwd):
        abort(403)
    # create token
    token = create_token(user_db.id)
    session["id"] = user_db.id
    session.modified = True
    return jsonify({"token": token})


@app.route('/authentication_admin', methods=['POST'])
@cross_origin(supports_credentials=True)
def authenticate_admin():
    admin_id = request.json['id']
    pwd = request.json['password']
    if not id or not pwd:
        abort(400)
    admin_db = Admin.query.filter_by(id=admin_id).first()
    # no username exists
    if admin_db is None:
        abort(403)
    # password don't match
    if not bcrypt.check_password_hash(admin_db.password, pwd):
        abort(403)
    # create token
    token = create_token(admin_db.id)
    session["id"] = admin_db.id
    session.modified = True
    return jsonify({"token": token})


@app.route('/view_info_admin', methods=['POST'])
@cross_origin(supports_credentials=True)
def view_info_admin():
    if request.json["token"] is None:
        abort(403)
    my_id = decode_token(request.json["token"])
    admin = Admin.query.filter_by(id=my_id).first()
    x = {
        "username": admin.username,
        "mail": admin.Email,
        "dob": admin.dob,
        "id": admin.id,
        "date_joined": admin.date_joined,
        "gender": admin.gender
    }

    return jsonify(x)


@app.route('/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    session.clear()
    return "LOGOUT SUCCESSFUL"


# method to test token at different points
@app.route('/test', methods=['GET'])
@cross_origin(supports_credentials=True)
def test():
    if "token" in session:
        return session["token"]
    else:
        return "no token"


# get token from header
def extract_auth_token(authenticated_request):
    auth_header = authenticated_request.headers.get('Authorization')
    if auth_header:
        return auth_header.split(" ")[1]
    else:
        return None


# decode token to get user id
def decode_token(token):
    payload = jwt.decode(token, SECRET_KEY, 'HS256')
    return payload['sub']


# create token valid for 4 days if not logged out
def create_token(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=4),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    )


@app.route('/email', methods=['GET'])
def send_email():
    sender = 'terkiz.club@gmail.com'
    recipients = request.json["recipients"]
    subject = request.json["subject"]
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = request.json["body"]
    Email.send(msg)
    return "Message sent!"


@app.route('/delete_user', methods=['POST'])
def delete_account():
    username = request.json["username"]
    user_delete = User.query.filter_by(username=username).first()
    db.session.delete(user_delete)
    db.session.commit()
    x = {
        "success": "Success"
    }
    return jsonify(x)


@app.route('/all_user', methods=['GET'])
@cross_origin(supports_credentials=True)
def all_user():
    users = User.query.all()
    success = jsonify(user_schema.dump(users))
    return success


@app.route('/edit_user', methods=['POST'])
@cross_origin(supports_credentials=True)
def edit_user():
    username = request.json['username']
    field = request.json['field']
    value = request.json['value']
    field = str(field)
    if request.json["token"] is None:
        abort(403)
    user = User.query.filter_by(username=username).first()
    setattr(user, field, value)
    db.session.add(user)
    db.session.commit()
    x = {
        "username": user.username,
        "field": getattr(user, field)
    }
    return jsonify(x)


@app.route('/all_admin', methods=['GET'])
@cross_origin(supports_credentials=True)
def all_admin():
    admins = Admin.query.all()
    success = jsonify(user_schema.dump(admins))
    return success


@app.route('/edit_admin', methods=['POST'])
@cross_origin(supports_credentials=True)
def edit_admin():
    field = request.json['field']
    value = request.json['value']
    field = str(field)
    if request.json["token"] is None:
        abort(403)
    my_id = decode_token(request.json["token"])
    admin = Admin.query.filter_by(id=my_id).first()
    setattr(admin, field, value)
    db.session.add(admin)
    db.session.commit()
    x = {
        "username": admin.username,
        "field": getattr(admin, field)
    }
    return jsonify(x)
