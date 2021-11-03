from typing import Text
import flask
from flask.helpers import url_for
from flask_login.utils import login_required
import os
import json


app = flask.Flask(__name__, static_folder='./build/static')
# This tells our Flask app to look at the results of `npm build` instead of the 
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.
bp = flask.Blueprint("bp", __name__, template_folder="./build")

app.secret_key = os.urandom(9)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    """ This is a catch all that is required for react-router """
    return flask.render_template('index.html')

@bp.route('/index')
# @login_required
def index():
    # TODO: insert the data fetched by your app main page here as a JSON
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
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

@app.route('/login', methods=["POST"])
def login_post():

    username= flask.request.json.get("username")
    password = flask.request.json.get("password")

    if len(username) == 0 and len(password) == 0:
        flask.flash("Enter valid Username. Please try again")
    
    if username == "Collins" and password == "Amadi":
        return flask.jsonify({"loginResponse": "Ok"})
	

# @app.route('/save', methods=["POST"])
# def save():
#     ...





app.run(
    # host=os.getenv('IP', '0.0.0.0'),
    # port=int(os.getenv('PORT', 8081)),
    debug=True
)
