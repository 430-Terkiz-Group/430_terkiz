from ..main import db,ma

# match class
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