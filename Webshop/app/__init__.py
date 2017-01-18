from flask import Flask
from flask_cors import CORS, cross_origin
from posts import posts
from requests import requests
from auth import auth

app = Flask(__name__)
app.secret_key = 'coconuts'
CORS(app)

app.register_blueprint(posts)
app.register_blueprint(requests)
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(debug=True)
