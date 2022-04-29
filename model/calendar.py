from ..app import db, ma


# item class
# used to access merchandise in the shop section
class Calendar(db.Model):
    # table name for Item model
    __tablename__ = "calendar"

    # item columns
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    title = db.Column(db.String(100))
    event_type = db.Column(db.String(100))
    description = db.Column(db.String(100))
    time_begin = db.Column(db.String(100))
    time_end = db.Column(db.String(100))
    last_modified_by = db.Column(db.String(100))
    privacy = db.Column(db.Boolean)

    # if item is not a piece of clothing, size = "NA"

    def __init__(self, title, event_type, description, time_begin, time_end, last_modified_by, privacy):
        # self.id=id
        self.title = title
        self.event_type = event_type
        self.description = description
        self.time_begin = time_begin
        self.time_end = time_end
        self.last_modified_by = last_modified_by
        self.privacy = privacy


class CalendarSchema(ma.Schema):
    class Meta:
        fields = (
            "id", "title", "event_type", "description", "time_begin", "time_end", "last_modified_by",
            "privacy")
        model = Calendar


class CalendarSchemaFan(ma.Schema):
    class Meta:
        fields = (
            "id", "title", "event_type", "description", "time_begin", "time_end")
        model = Calendar
