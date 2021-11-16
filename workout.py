import flask
import os
from flask_sqlalchemy import SQLAlchemy

app = flask.Flask(__name__)

url = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_DATABASE_URI'] = url
# "postgresql://jfcnsbxgppwgdq:14793a5b54f0b5a25a6359a95c07a71b0a42b076q073b5c556b7ef739a9076fba@ec2-3-230-149-158.compute-1.amazonaws.com:5432/d4fptrh111bdmj"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(120))
    #user_id = db.Column(db.Integer)
    #bodyweight = db.Column(db.Numeric)
    # jumprope = db.Column(db~.Integer)
    milesran = db.Column(db.Integer)
    pushups = db.Column(db.Integer)
    jumpingjacks = db.Column(db.Integer)


db.create_all()  # creating the above table

db.session.add(Workout)
db.session.commit()


@app.route("/")
def index():
    return "hello world"
    # flask.render_template(
    #     "index.html",
    #     lenght=0,
    #     date=[],
    #     milesran=[],
    #     pushups=[],
    #     jumpingjacks=[],
    # )


app.run(debug=True)
