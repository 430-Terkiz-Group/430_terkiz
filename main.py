import datetime

from flask import Flask, abort, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask import request
from flask import jsonify
import os
import jwt

SECRET_KEY = "b'|\xe7\xbfU3`\xc4\xec\xa7\xa9zf:}\xb5\xc7\xb9\x139^3@Dv'"
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'Project_DB.db')
app.secret_key = "b'|\xe7\xbfU3`\xc4\xec\xa7\xa9zf:}\xb5\xc7\xb9\x139^3@Dv'"

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(app)
# meta data required for creating table in sqlite, should not use anymore since db is already created LEAVE IT THOUGH
# AS i am not sure
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
matchestable = Table('matches', meta, Column('id', Integer, primary_key=True, autoincrement=True),
                     Column('opponent', String), Column('result_terkiz', Integer), Column('result_opponent', Integer),
                     Column('home', Integer), Column('match_type', String), Column('date_played', String))


# user class
class User(db.Model):
    # table name for User model
    __tablename__ = "users"

    # user columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))
    mail = db.Column(db.String(128))
    dob = db.Column(db.String(100))
    gender = Column(db.String(50))
    date_joined = Column(db.String(50))

    def __init__(self, username, password, mail, dob, gender):
        # self.id=id
        self.username = username
        self.password = bcrypt.generate_password_hash(password)
        self.mail = mail
        self.dob = dob
        self.gender = gender
        self.date_joined = datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")


# item class
# used to access merchandise in the shop section
class Item(db.Model):
    # table name for Item model
    __tablename__ = "items"

    # item columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    price = db.Column(db.Integer)
    stockleft = db.Column(db.Integer)
    kind = db.Column(db.String(100))
    sale = db.Column(db.Boolean)
    size = db.Column(db.String(64))  # indicatees the size of the item if it is clothing


    # if item is not a piece of clothing, size = "NA"

    def __init__(self, name, price, stockleft, kind, sale, size):
        # self.id=id
        self.name = name
        self.price = price
        self.stockleft = stockleft
        self.kind = kind
        self.sale = sale
        self.size = size






# ticket class
# used to access ticket information in the shop section
class Ticket(db.Model):
    # table name for Ticket model
    __tablename__ = "tickets"

    # ticket columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)

    price = db.Column(db.Integer)
    ticketsleft = db.Column(db.Integer)
    sector = db.Column(db.Integer)
    vip = db.Column(db.String)  # indicates if the ticket is in the vip section or not
    match = db.Column(db.String(64))  # indicates if the match is home or away
    competition = db.Column(db.String(100))  # type of competition in the match

    def __init__(self, price, ticketsleft, sector, vip, match, competition):
        # self.id=id

        self.price = price
        self.ticketsleft = ticketsleft
        self.sector = sector
        self.vip = vip
        self.match = match


class Match(db.Model):
    __tablename__ = "matches"

    # user columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    opponent = db.Column(db.String(64))
    result_terkiz = db.Column(db.Integer())
    result_opponent = db.Column(db.Integer())
    home = db.Column(db.Integer())
    match_type = db.Column(db.String(64))
    date_played = db.Column(db.String(16))

    def __init__(self, opponent, result_terkiz, result_opponent, home, date_played, match_type):
        self.opponent = opponent
        self.result_terkiz = result_terkiz
        self.result_opponent = result_opponent
        self.home = home
        self.date_played = date_played
        self.match_type = match_type


class MatchSchema(ma.Schema):
    class Meta:
        fields = ("id", "opponent", "result_terkiz", "result_opponent", "home", "match_type", "date_played")
        model = Match


matches_schema = MatchSchema(many=True)


# api to add item to db
# expects json file with price, stockleft, kind, sale, size
@app.route('/add_item', methods=['POST'])
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


# remove/add items from the cart
@app.route('/update_cart', methods=['POST'])
# expects item added + qtty
def update_cart():
    # need to check if cart dictionary exists first in session
    item_id = request.json["id"]
    qtty = request.json["qtty"]
    exists = False
    if "token" in session:
        if session["token"]:
            if "cart" not in session:
                # create cart to store temporarly items in session
                session["cart"]={}
                session["cart"][item_id]=qtty
            else:  # cart is alreadsy there, check if item already in cart, if yes just add/substract the qtty, else create new entry in session storage
                for id in session["cart"]:
                    if id == item_id:
                        session["cart"][id] += qtty
                        exists = True
                        break
                if (exists == False):  # create new entry
                    session["cart"][item_id] = qtty
                return jsonify({"item":item_id,"qtty":qtty})


        else:
            abort(403)
    else:
        abort(403)


# api to get items added to cart by id
# makes use of
@app.route('/get_items', methods=['GET'])
def get_item():
    # check if token is in session dictionary
    if ("token" in session):
        # check if token is not null in case user logged out
        if (session["token"]):
            # here user is logged in and we will return the items he has bought

            if ("cart" in session):  # check if cart exists
                item_ids = []
                qtty = []
                for id in session["cart"]:  # GET IDS oof items + qtty
                    item_ids.append(item_ids)
                    qtty.append(session)
                # now fetch items and store them in list

                # get list of items whos ids are in the list above
                item = Item.query.filter_by(Item.id.in_(item_ids)).all()
                #create dictionary to return
                dicto={}
                increment =0
                for i in item:
                    #create a temp dictionary to add to main one to be returned
                    name = i.name
                    price = i.price
                    kind = i.kind
                    size = i.size
                    quantity = qtty[i]
                    temp ={"name":name,"price":price,"kind":kind,"size":size,"quantity":quantity}
                    dicto[i]=temp
                    increment +=1
                #now return main dictionry
                return jsonify(dicto)







            else:
                abort(400)  # no items added in cart







        else:
            abort(403)
    else:
        abort(403)


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


@app.route('/view_info', methods=['GET'])
def view_info():
    user_name = "Aziz"
    user = User.query.filter_by(username=user_name).first()
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
    # password dont match
    if not bcrypt.check_password_hash(user_db.password, pwd):
        abort(403)
    # create token
    token = create_token(user_db.id)
    session["token"] = token
    print(session["token"])
    return jsonify({"tkn": token})


@app.route('/logout', methods=['POST'])
def logout():
    if ("token" in session):
        session["token"] = None
    return "LOGOUT SUCCESSFUL"


@app.route('/test', methods=['GET'])
def test():
    token = extract_auth_token(request)

    try:
        usid = decode_token(token)

    except jwt.ExpiredSignatureError as error:
        abort(403)
    except jwt.InvalidTokenError as error:
        abort(403)
    dicto = {"token": token, "id": usid}
    return jsonify(dicto)


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
