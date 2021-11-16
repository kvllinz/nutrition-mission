"""
App.py
"""
# from typing import Text
import os
import json
from dotenv import find_dotenv, load_dotenv
from flask_login import (
    LoginManager,
    login_manager,
    login_user,
)

import flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

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
    username = sqlalchemy.Column(sqlalchemy.String(120), unique=True)

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
    """This is a catch all that is required for react-router"""
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
    app.run(use_reloader=True, debug=True)
    # app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)))
