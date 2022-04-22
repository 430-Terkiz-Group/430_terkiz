from ..app import db

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