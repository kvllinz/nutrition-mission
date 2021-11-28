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


# db.drop_all()
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


def get_user_info_from_db():
    """
    Query all the user information from database
    """
    users = CreateUser.query.all()
    expected_email = []
    expected_name = []
    expected_age = []
    expected_gender = []
    expected_weight = []
    expected_height = []
    for user in users:
        expected_email.append(user.email)
        expected_name.append(user.name)
        expected_age.append(user.age)
        expected_gender.append(user.gender)
        expected_weight.append(user.weight)
        expected_height.append(user.height)

    return (
        expected_email,
        expected_name,
        expected_age,
        expected_gender,
        expected_weight,
        expected_height,
    )


def getemail(email):
    """
    Get email for the user, to check user information in other function
    """
    email = CreateUser.query.filter_by(email=email).first()
    return email


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
    checkemail = getemail(email)
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


@app.route("/getuserinfo", methods=["POST"])
def userinfo():
    """
    Send UserData if it exists to the frontend
    """
    try:
        email = flask.request.json.get("email")
        user = CreateUser.query.filter_by(email=email).first()
        weight, height, age, gender = userinfocalories(user.email)
        cal = usercalories(weight, height, age, gender)
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


def userinfocalories(useremail):
    """
    Get user infomation for calories calculator
    """
    user = CreateUser.query.filter_by(email=useremail).first()
    return user.weight, user.height, user.age, user.gender


def usercalories(weight, height, age, gender):
    """
    Get calories needed from the user
    """
    caloriesneeded = (10 * int(weight)) + (6.25 * int(height)) - (5 * int(age))
    if gender == "F":
        caloriesneeded -= 161
    elif gender == "M":
        caloriesneeded += 5
    return caloriesneeded


if __name__ == "__main__":
    # First app.run is local use. Second app.run is Heroku.
    app.run(use_reloader=True, debug=True)
    # app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
