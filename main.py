from datetime import datetime

from flask import Flask, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask import request
from flask import jsonify
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'Project_DB.db')
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(app)
# meta data required for creating table in sqlite, should not use anymore since db is already created LEAVE IT THOUGH
# AS i am not sure
meta = MetaData()
# same as meta data
userstable = Table('users', meta, Column('id', Integer, primary_key=True, autoincrement=True),
                   Column('username', String, unique=True), Column('password', String),Column('mail',String),Column('dob',String),Column('gender',String),Column('date_joined',String))


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
    gender=Column(db.String(50))
    date_joined = Column(db.String(50))

    def __init__(self, username, password,mail,dob,gender):
        # self.id=id
        self.username = username
        self.password = bcrypt.generate_password_hash(password)
        self.mail = mail
        self.dob  = dob
        self.gender=gender
        self.date_joined=datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")


# api to add user to db
# expects json file with username , password , mail , dob and gender fields create time is automatic
@app.route('/add_user', methods=['POST'])
def add_user():
    name = request.json['username']
    pwd = request.json['password']
    mail = request.json['mail']
    dob = request.json['dob']
    gender= request.json['gender']
    if not name or not pwd or not dob or not mail :
        # name is empty or pwd is empty
        abort(400)
    # check for unique name
    not_unique = User.query.filter_by(username=name).first()
    # similar username exists
    if not_unique:
        abort(406)  # not acceptable
    newuser = User(name,pwd ,mail,dob,gender)
    db.session.add(newuser)
    db.session.commit()
    return "Success"


@app.route('/view_info', methods=['GET'])
def view_info():
    user_name = "Bero"
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
