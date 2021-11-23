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
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.sql.expression import null
from spoonacular import getrecipeswithcalories

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")
bp = flask.Blueprint("bp", __name__, template_folder="./build")

# Point SQLAlchemy to your Heroku database
url = os.getenv("DATABASE_URL")

if url and url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = url
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.secret_key = os.urandom(9)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)


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

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    Milesrun = sqlalchemy.Column(sqlalchemy.String(10))
    pushups = sqlalchemy.Column(sqlalchemy.String(10))
    jumpingjacks = sqlalchemy.Column(sqlalchemy.String(10))
    swimming = sqlalchemy.Column(sqlalchemy.String(10))
    jogging = sqlalchemy.Column(sqlalchemy.String(10))
    Bicycling = sqlalchemy.Column(sqlalchemy.String(10))
    ropeclimb = sqlalchemy.Column(sqlalchemy.String(10))
    toereaches = sqlalchemy.Column(sqlalchemy.String(10))
    crunches = sqlalchemy.Column(sqlalchemy.String(10))

    # id = db.Column(db.Integer, primary_key=True)
    # milesran = db.Column(db.Integer)
    # pushups = db.Column(db.Integer)
    # jumpingjacks = db.Column(db.Integer)
    # swimming = db.Column(db.Integer)
    # jogging = db.Column(db.Integer)
    # Bicycling = db.Column(db.Integer)
    # ropeclimb = db.Column(db.Integer)
    # toereaches = db.Column(db.Integer)
    # crunches = db.Column(db.Integer)


# db.drop_all()
db.create_all()


@login_manager.user_loader
def load_user(user_id):
    """
    Load a user
    """
    return CreateUser.query.get(int(user_id))


@login_manager.user_loader
def load_user(user_id):
    return Workout.query.get(int(user_id))


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    """
    This is a catch all that is required for react-router
    """
    return flask.render_template("index.html")


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
    Milesrun = flask.request.json.get("Milesrun")
    pushups = flask.request.json.get("pushups")
    jumpingjacks = flask.request.json.get("jumpingjacks")
    swimming = flask.request.json.get("swimming")
    jogging = flask.request.json.get("jogging")
    Bicycling = flask.request.json.get("Bicycling")
    ropeclimb = flask.request.json.get("ropeclimb")
    toereaches = flask.request.json.get("toereaches")
    crunches = flask.request.json.get("crunches")
    checkemail = CreateUser.query.filter_by(email=email).first()
    if checkemail:
        checkemail.age = age
        checkemail.height = height
        checkemail.weight = weight
        checkemail.gender = gender
        checkemail.Milesrun = Milesrun
        checkemail.pushups = pushups
        checkemail.jumpingjacks = jumpingjacks
        checkemail.swimming = swimming
        checkemail.jogging = jogging
        checkemail.Bicycling = Bicycling
        checkemail.ropeclimb = ropeclimb
        checkemail.toereaches = toereaches
        checkemail.crunches = crunches
        db.session.commit()
    else:
        user = CreateUser(
            email=email, name=name, age=age, gender=gender, weight=weight, height=height
        )
        db.session.add(user)
        db.session.commit()
    return flask.jsonify({"loginResponse": "Ok"})


@app.route("/getuserinfo", methods=["POST"])
def userinfo():
    """
    Send UserData if it exists to the frontend
    """
    try:
        email = flask.request.json.get("email")
        user = CreateUser.query.filter_by(email=email).first()
        cal = usercalories(user.email)
        recipes = getrecipeswithcalories(cal)
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


def usercalories(useremail):
    """
    Get calories needed from the user
    """
    user = CreateUser.query.filter_by(email=useremail).first()
    caloriesneeded = (
        (10 * int(user.weight)) + (6.25 * int(user.height)) - (5 * int(user.age))
    )
    if user.gender == "F":
        caloriesneeded -= 161
    elif user.gender == "M":
        caloriesneeded += 5
    return caloriesneeded


@app.route("/login", methods=["POST"])
def login_posst():
    """
    Get username and password from client, check if it is valid and log them in
    """
    name = flask.request.json.get("name")
    email = flask.request.json.get("email")
    Milesrun = flask.request.json.get("Milesrun")
    pushups = flask.request.json.get("pushups")
    jumpingjacks = flask.request.json.get("jumpingjacks")
    swimming = flask.request.json.get("swimming")
    jogging = flask.request.json.get("jogging")
    Bicycling = flask.request.json.get("Bicycling")
    ropeclimb = flask.request.json.get("ropeclimb")
    toereaches = flask.request.json.get("toereaches")
    crunches = flask.request.json.get("crunches")

    checkemail = Workout.query.filter_by(email=email).first()
    if checkemail:
        checkemail.Milesrun = Milesrun
        checkemail.pushups = pushups
        checkemail.jumpingjacks = jumpingjacks
        checkemail.swimming = swimming
        checkemail.jogging = jogging
        checkemail.Bicycling = Bicycling
        checkemail.ropeclimb = ropeclimb
        checkemail.toereaches = toereaches
        checkemail.crunches = crunches

        db.session.commit()
    else:
        user = Workout(
            email=email, name=name, Milesrun=Milesrun, pushups=pushups, jumpingjacks=jumpingjacks, swimming=swimming, jogging=jogging, Bicycling=Bicycling, ropeclimb=ropeclimb, toereaches=toereaches, crunches=crunches
        )
        db.session.add(user)
        db.session.commit()
    return flask.jsonify({"loginResponse": "Ok"})


@app.route("/Try1", methods=["POST"])
def userinfoo():
    """
    Send UserData if it exists to the frontend
    """
    try:
        email = flask.request.json.get("email")
        user = CreateUser.query.filter_by(email=email).first()
        cal = usercalories(user.email)
        recipes = getrecipeswithcalories(cal)
        data = {
            "Milesrun": user.Milesrun,
            "pushups": user.pushups,
            "jumpingjacks": user.jumpingjacks,
            "swimming": user.swimming,
            "jogging": user.jogging,
            "Bicycling": user.Bicycling,
            "ropeclimb": user.ropeclimb,
            "toereaches": user.toereaches,
            "crunches": user.crunches,
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


def usercalories(useremail):
    """
    Get calories needed from the user
    """
    user = CreateUser.query.filter_by(email=useremail).first()
    caloriesneeded = (
        (10 * int(user.weight)) + (6.25 * int(user.height)) - (5 * int(user.age))
    )
    if user.gender == "F":
        caloriesneeded -= 161
    elif user.gender == "M":
        caloriesneeded += 5
    return caloriesneeded


if __name__ == "__main__":
    # First app.run is local use. Second app.run is Heroku.
    app.run(use_reloader=True, debug=True)
    #app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
