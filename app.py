"""
App.py
"""
<<<<<<< HEAD
# pylint: disable=no-member
=======
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
# from typing import Text
import os
import json
from dotenv import find_dotenv, load_dotenv
from flask_login import (
    LoginManager,
    login_manager,
<<<<<<< HEAD
    # login_user,
    current_user,
=======
    login_user,
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
)

import flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")
<<<<<<< HEAD
=======
# This tells our Flask app to look at the results of `npm build` instead of the
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
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
<<<<<<< HEAD
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    email = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    name = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    age = sqlalchemy.Column(sqlalchemy.String(3))
    gender = sqlalchemy.Column(sqlalchemy.String(1))
    weight = sqlalchemy.Column(sqlalchemy.String(3))
    height = sqlalchemy.Column(sqlalchemy.String(3))


db.drop_all()
=======

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    username = sqlalchemy.Column(sqlalchemy.String(120), unique=True)

# creating workout class


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    bodyweight = db.Column(db.Numeric)
    milesran = db.Column(db.Integer)
    pushups = db.Column(db.Integer)
    jumpingjacks = db.Column(db.Integer)


db.session.add(Workout)
db.session.commit()
"""
    Is any of this stuff really necessary? I didn't need it for the project1. - Owen
    """
# def is_authenticated(self):
#     """
#     Is user authenticated
#     """
#     return True

# def is_active(self):
#     """
#     Is user active
#     """
#     return True

# def is_anonymous(self):
#     """
#     Is user anonymous
#     """
#     return False

# def get_id(self):
#     """
#     Get ID of the user
#     """
#     return str(self.id)

# def __repr__(self):
#     """
#     Return user
#     """
#     return f"<User {self.username}>"


>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
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
<<<<<<< HEAD
    """
    This is a catch all that is required for react-router
    """
=======
    """This is a catch all that is required for react-router"""
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
    return flask.render_template("index.html")


@bp.route("/index")
# @login_required
def index():
    """
    Index router
    """
<<<<<<< HEAD
=======
    # insert the data fetched by your app main page here as a JSON
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
    data = {"your": "data here"}
    data = json.dumps(data)
    return flask.render_template(
        "index.html",
        data=data,
    )

<<<<<<< HEAD

app.register_blueprint(bp)
=======

app.register_blueprint(bp)

# @app.route('/signup')
# def signup():
# 	...

# @app.route('/signup', methods=["POST"])
# def signup_post():
# 	...

# @app.route('/login')
# def login():
#     ...
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054


@app.route("/login", methods=["POST"])
def login_post():
    """
    Get username and password from client, check if it is valid and log them in
    """
<<<<<<< HEAD
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


@app.route("/getuserinfo", methods=["POST"])
def userInfo():
    """
    Send UserData if it exists to the frontend
    """
    try:
        email = flask.request.json.get("email")
        user = CreateUser.query.filter_by(email=email).first()
        cal = usercalories(user.email)
        data = {
            "weight": user.weight,
            "height": user.height,
            "age": user.age,
            "gender": user.gender,
            "calories": cal
        }
    except:
        data = {
            "weight": 0,
            "height": 0,
            "age": 0,
            "gender": 0,
            "calories": 0
        }
    return flask.jsonify({"data": data})


def usercalories(userEmail):
    """
    Get calories needed from the user
    """
    user = CreateUser.query.filter_by(email=userEmail).first()
    caloriesneeded = (10 * int(user.weight)) + \
        (6.25 * int(user.height)) - (5 * int(user.age))
    if user.gender == "F":
        caloriesneeded -= 161
    elif user.gender == "M":
        caloriesneeded += 5
    return(caloriesneeded)


if __name__ == "__main__":
    # First app.run is local use. Second app.run is Heroku.
    app.run(use_reloader=True, debug=True)
    #app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
=======
    username = flask.request.json.get("username")
    password = flask.request.json.get("password")

    username = flask.request.json.get("username")
    password = flask.request.json.get("password")

    if len(username) == 0 and len(password) == 0:
        flask.flash("Enter valid Username. Please try again")
    user = CreateUser.query.filter_by(username=username).first()
    if user and password == "Amadi":
        login_user(user)
        return flask.jsonify({"loginResponse": "Ok"})

    # @app.route('/save', methods=["POST"])
    # def save():
    #     ...

    if len(username) == 0 and len(password) == 0:
        flask.flash("Enter valid Username. Please try again")
    user = CreateUser.query.filter_by(username=username).first()
    if user and password == "Amadi":
        login_user(user)
        return flask.jsonify({"loginResponse": "Ok"})


# @app.route('/save', methods=["POST"])
# def save():
#     ...

if __name__ == "__main__":
    # First app.run is local use. Second app.run is Heroku.
    # app.run(use_reloader=True, debug=True)
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
>>>>>>> 371f0ad48bed6a0280e31892b275591b49715054
