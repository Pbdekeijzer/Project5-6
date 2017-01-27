from flask import Flask
from flask_cors import CORS, cross_origin
from app.posts import posts as p
from app.requests import requests as r
from app.auth import auth as a

app = Flask(__name__)
app.secret_key = 'coconuts'
CORS(app)

app.register_blueprint(p)
app.register_blueprint(r)
app.register_blueprint(a)

if __name__ == '__main__':
    app.run(debug=True)
