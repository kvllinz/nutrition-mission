"""
App.py
"""
# pylint: disable=no-member
# pylint: disable=bare-except
# from typing import Text
import os
import json
from dotenv import find_dotenv, load_dotenv
from flask_login import LoginManager, login_manager
import flask
from spoonacular import getrecipeswithcalories, usercalories
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

load_dotenv(find_dotenv())
app = flask.Flask(__name__, static_folder="./build/static")

login_manager = LoginManager()
login_manager.init_app(app)

url = os.getenv("DATABASE_URL")
if url and url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.urandom(9)
db = SQLAlchemy(app)

class CreateUser(db.Model):
    """
    Model for Users
    """

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    email = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    name = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    age = sqlalchemy.Column(sqlalchemy.String(3))
    gender = sqlalchemy.Column(sqlalchemy.String(1))
    weight = sqlalchemy.Column(sqlalchemy.String(3))
    height = sqlalchemy.Column(sqlalchemy.String(3))

class Workout(db.Model):
    """
    Model for Workouts
    """

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    email = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    milesRun = sqlalchemy.Column(sqlalchemy.Integer, unique=True)
    pushUps = sqlalchemy.Column(sqlalchemy.Integer, unique=True)
    jumpingJacks = sqlalchemy.Column(sqlalchemy.Integer, unique=True)
    sitUps = sqlalchemy.Column(sqlalchemy.Integer, unique=True)

db.drop_all()
db.create_all()


@login_manager.user_loader
def load_user(user_id):
    """
    Load a user
    """
    return CreateUser.query.get(int(user_id))


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    """
    This is a catch all that is required for react-router
    """
    return flask.render_template("index.html")

bp = flask.Blueprint("bp", __name__, template_folder="./build")

@bp.route("/index")
# @login_required
def index():
    """
    Index router
    """
    data = {"your": "data here"}
    data = json.dumps(data)
    return flask.render_template(
        "index.html",
        data=data,
    )


app.register_blueprint(bp)


@app.route("/getuserinfo", methods=["POST"])
def userinfo():
    """
    Send UserData if it exists to the frontend
    """
    try:
        email = flask.request.json.get("email")
        user = CreateUser.query.filter_by(email=email).first()
        cal = usercalories(CreateUser.query.filter_by(email=user.email).first())
        print(cal)
        recipes = getrecipeswithcalories(cal)
        print(recipes)
        data = {
            "weight": user.weight,
            "height": user.height,
            "age": user.age,
            "gender": user.gender,
            "calories": cal,
            "recipes": recipes,
        }
    except:
        recipes = getrecipeswithcalories(2000)
        data = {
            "weight": 0,
            "height": 0,
            "age": 0,
            "gender": 0,
            "calories": 0,
            "recipes": recipes,
        }
    return flask.jsonify({"data": data})



@app.route("/workoutinfo", methods=["POST"])
def workoutinfo():
    """
    Send UserData if it exists to the frontend
    """
    try:
        email = flask.request.json.get("email")
        print(email)
        userTotalWorkout = Workout.query.filter_by(email = str(email)).first()
        print(userTotalWorkout)
        data = {
            "totalMiles": userTotalWorkout.milesRun,
            "totalPushUps": userTotalWorkout.pushUps,
            "totalJumpingJacks": userTotalWorkout.jumpingJacks,
            "totalSitUps": userTotalWorkout.sitUps
            }
    except:
        data = {
            "totalMiles": 0,
            "totalPushUps": 0,
            "totalJumpingJacks": 0,
            "totalSitUps": 0,
        }
    return flask.jsonify({"data": data})


@app.route("/login", methods=["POST"])
def login_post():
    """
    Get username and password from client, check if it is valid and log them in
    """
    name = flask.request.json.get("name")
    email = flask.request.json.get("email")
    age = flask.request.json.get("age")
    gender = flask.request.json.get("gender")
    weight = flask.request.json.get("weight")
    height = flask.request.json.get("height")
    checkemail = CreateUser.query.filter_by(email=email).first()
    if checkemail:
        checkemail.age = age
        checkemail.height = height
        checkemail.weight = weight
        checkemail.gender = gender
        db.session.commit()
    else:
        user = CreateUser(
            email=email, name=name, age=age, gender=gender, weight=weight, height=height
        )
        db.session.add(user)
        db.session.commit()
    return flask.jsonify({"loginResponse": "Ok"})


@app.route("/workout", methods=["POST"])
def workout_post():
    """
    Get username and password from client, check if it is valid and log them in
    """
    email = flask.request.json.get("email")
    milesRun = flask.request.json.get("milesRun")
    pushUps = flask.request.json.get("pushUps")
    jumpingJacks = flask.request.json.get("jumpingJacks")
    sitUps  = flask.request.json.get("sitUps")
    # print(date, email, milesRun, pushUps, jumpingJacks, sitUps)
    # return flask.jsonify({"loginResponse": "Ok"})
    checkemail = Workout.query.filter_by(email=email).first()
    if checkemail:
        checkemail.milesRun = checkemail.milesRun + milesRun
        checkemail.pushUps = checkemail.pushUps + pushUps
        checkemail.jumpingJacks = checkemail.jumpingJacks + jumpingJacks
        checkemail.sitUps = checkemail.sitUps + sitUps
        db.session.commit()
    else:
        userWod = Workout(
            email=email, milesRun= milesRun, pushUps=pushUps, jumpingJacks=jumpingJacks, sitUps=sitUps
        )
        db.session.add(userWod)
        db.session.commit()
    return flask.jsonify({"WorkoutResponse": "Ok"})


if __name__ == "__main__":

    # First app.run is local use. Second app.run is Heroku.
    # app.run(use_reloader=True, debug=True)
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
