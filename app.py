"""
App.py
"""
# pylint: disable=no-member
# pylint: disable=bare-except
# from typing import Text
import os
import json
from dotenv import find_dotenv, load_dotenv
<<<<<<< Updated upstream
from flask_login import (
    LoginManager,
    login_manager,
    login_user,
    current_user,
)

import flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
=======
from flask_login import LoginManager, login_manager
import flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.sql.expression import null
from spoonacular import getrecipeswithcalories
>>>>>>> Stashed changes

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")
# This tells our Flask app to look at the results of `npm build` instead of the
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.
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
    age = sqlalchemy.Column(sqlalchemy.String(120))
    gender = sqlalchemy.Column(sqlalchemy.String(120))
    weight = sqlalchemy.Column(sqlalchemy.String(120))
    height = sqlalchemy.Column(sqlalchemy.String(120))

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
    print(path)

    return flask.render_template("index.html")


@bp.route("/index")
# @login_required
def index():
    """
    Index router
    """
    # insert the data fetched by your app main page here as a JSON
    data = {"your": "data here"}
    data = json.dumps(data)
    return flask.render_template(
        "index.html",
        data=data,
    )


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

    print(name, email, age, gender, weight, height)

    checkemail = CreateUser.query.filter_by(email=email).first()
    if checkemail:
        checkemail.weight = weight
        db.session.commit()
    else:
        user = CreateUser(
            email=email, name=name, age=age, gender=gender, weight=weight, height=height
        )
        db.session.add(user)
        db.session.commit()

    # if not checkemail:
    #     user = CreateUser(email=email, name=name, age=age, gender=gender, weight=weight)
    #     db.session.add(user)
    #     db.session.commit()
    #     print(user)

    # username = flask.request.json.get("username")
    # password = flask.request.json.get("password")

    # if len(username) == 0 and len(password) == 0:
    #     flask.flash("Enter valid Username. Please try again")
    # user = CreateUser.query.filter_by(username=username).first()
    # if user and password == "Amadi":
    #     login_user(user)
    #     return flask.jsonify({"loginResponse": "Ok"})

    # # @app.route('/save', methods=["POST"])
    # # def save():
    # #     ...

    # if len(username) == 0 and len(password) == 0:
    #     flask.flash("Enter valid Username. Please try again")
    # user = CreateUser.query.filter_by(username=username).first()
    # if user and password == "Amadi":
    #     login_user(user)
    return flask.jsonify({"loginResponse": "Ok"})


<<<<<<< Updated upstream
@app.route("/info", methods=["GET"])
def info():
    """
    Give dummy info
    """
    data = {"a": "OK", "b": "sure"}
    return flask.jsonify({"data": data})


# @app.route('/save', methods=["POST"])
# def save():
#     ...
def usercalories():
    """
    Get calories needed from the user
    """
    user = CreateUser.query.get(current_user.id)
    caloriesneeded = (10 * user.weight) + (6.25 * user.height) - (5 * user.age)
    if user.gender == "female":
=======
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
>>>>>>> Stashed changes
        caloriesneeded -= 161
    elif user.gender == "male":
        caloriesneeded += 5
<<<<<<< Updated upstream
    print(caloriesneeded)
=======
    return caloriesneeded
>>>>>>> Stashed changes


if __name__ == "__main__":
    # First app.run is local use. Second app.run is Heroku.
    # app.run(use_reloader=True, debug=True)
<<<<<<< Updated upstream
    # app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
    app.run(debug=True)
=======
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
>>>>>>> Stashed changes
