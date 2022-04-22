from ..app import db,ma

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


class ItemSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "price", "stockleft", "kind","sale","size")
        model = Item
