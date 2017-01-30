from flask import session, render_template
from app.models.AccountModel import *
from functools import wraps

def authenticate_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if "username" in session and AccountModel.checkifExists(session["username"]):
            user_name = session["username"]
            user_id = AccountModel.getUID(user_name)
            return func(user_id, *args, **kwargs)
        return render_template('login.html')
    return wrapper

def authenticate_admin(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if "username" in session:
            user_name = session["username"]
            if AccountModel.checkifExists(user_name) and AccountModel.isAdmin(user_name):
                return func(*args, **kwargs)
            return "Account has no admin rights", 200
        return render_template('login.html')
    return wrapper