from ..app import db,ma
import datetime


class Orders(db.Model):
    # table name for orders model
    __tablename__ = "orders"

    # orders columns
    user_id = db.Column(db.Integer())
    item_id= db.Column(db.Integer())
    order_date=db.Column(db.String(50))
    amount = db.Column(db.Integer)
    order_id = db.Column(db.Integer,primary_key= True,autoincrement=True)



    def __init__(self, userid, item_id,amount):
        # self.id=id
        self.user_id=userid
        self.item_id=item_id
        self.amount=amount
        self.order_date = datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")

class OrdersSchema(ma.Schema):
    class Meta:
        fields = ("user_id", "item_id", "order_date", "amount", "order_id")
        model = Orders
