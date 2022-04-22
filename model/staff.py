import random

from ..app import db, bcrypt,ma
import datetime


class Staff(db.Model):
    # table name for User model
    __tablename__ = "staff"

    # user columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))
    mail = db.Column(db.String(128))
    dob = db.Column(db.String(100))
    gender = db.Column(db.String(50))
    date_joined = db.Column(db.String(50))
    position = db.Column(db.String(50))
    phone = db.Column(db.String(32))

    def __init__(self, username, password, mail, dob, gender, position, phone):
        self.username = username
        self.password = bcrypt.generate_password_hash(password)
        self.mail = mail
        self.dob = dob
        self.gender = gender
        self.date_joined = datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")
        self.position = position
        self.phone = phone


class StaffSchema(ma.Schema):
    class Meta:
        fields = ("username", "mail", "dob", "gender", "date_joined", "position", "phone")
        model = Staff
