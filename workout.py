import flask
import os
from flask_sqlalchemy import SQLAlchemy

app = flask.Flask(__name__)

url = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_DATABASE_URI'] = url

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(120))
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
