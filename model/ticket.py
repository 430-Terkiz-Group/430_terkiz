from ..app import db,ma

# ticket class
# used to access ticket information in the shop section
class Ticket(db.Model):
    # table name for Ticket model
    __tablename__ = "tickets"

    # ticket columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)

    price = db.Column(db.String(64))
    ticketsleft = db.Column(db.Integer)
    sector = db.Column(db.Integer)
    match = db.Column(db.String(64))  # indicates if the match is home or away
    competition = db.Column(db.String(100))  # type of competition in the match
    date = db.Column(db.String(64))
    passed = db.Column(db.String(64))

    def __init__(self, price, ticketsleft, sector, match, competition, date, passed):
        # self.id=id

        self.price = price
        self.ticketsleft = ticketsleft
        self.sector = sector
        self.match = match
        self.competition = competition
        self.date = date
        self.passed = passed

class TicketSchema(ma.Schema):
    class Meta:
        fields = ("id", "price", "ticketsleft", "sector", "match", "competition", "date", "passed")
        model = Ticket
