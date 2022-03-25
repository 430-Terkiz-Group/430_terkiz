from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from flask_bcrypt import Bcrypt


import os



basedir=os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
bcrypt = Bcrypt(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'Project_DB')
engine= create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(app)

meta = MetaData()
userstable = Table('users', meta, Column('id', Integer, primary_key = True, autoincrement=True), Column('username', String, unique=True), Column('password', String))
class User(db.Model):
    # table name for User model
    __tablename__ = "users"

    # user columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))

    def __init__(self, username, password):
        # self.id=id
        self.username = username
        self.password = bcrypt.generate_password_hash(password)

