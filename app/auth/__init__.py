from flask import Blueprint, request, make_response, jsonify, render_template, session, redirect, url_for
from app.auth.authenticate import *
from app.models.AccountModel import *
from app.MySQLdatabase import *
from flask import current_app as app
import json


auth = Blueprint('Auth', __name__, template_folder="templates", static_folder="static")

@auth.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        result = AccountModel.checkAccount(username, password)
        blocked = AccountModel.isBlocked(username)
        if result:
            if not blocked:          
                session["username"] = username
                session.permanent = True
                redirect_to_index = redirect(url_for('Requests.index'))
                response = app.make_response(redirect_to_index)
                """TODO: Refactor this."""
                query = "select Adminbool from User_ where User_Name = %s"
                adminbool = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
                adminbool = adminbool[0]
                response.set_cookie('user', username +'='+ str(adminbool[0])+'=')            
                return response
            return "Your account is blocked, access denied"
        return "401"
    return render_template('login.html')

@auth.route('/logout')
def logout():
    session.clear()
    redirect_to_index = redirect(url_for('Requests.index'))
    response = app.make_response(redirect_to_index)
    response.set_cookie('user', '', expires=0)
    return response

@auth.route('/register', methods=['GET', 'POST'])
def register():  
    if request.method == 'POST':
        username = request.form['username'] 
        password = request.form['password']
        email = request.form['email']
        postal_code = request.form['postal_code']
        house_number = request.form['house_number']
        account = AccountModel(username = username, password = password, email = email, postal_code = postal_code, house_number = house_number)
        result = account.insertAccount()
        if result:
            return "Succes"
        return "Failed"
    return render_template('register.html')