from flask import Flask, request, make_response, jsonify, render_template, session, redirect, url_for
from flask_cors import CORS, cross_origin
from ItemModel import *
from AccountModel import *
from WishlistModel import *
import json


app = Flask(__name__)
app.secret_key = 'coconuts'
CORS(app)

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/wishlist', methods=['GET', 'POST'])
def wishlist():
    print(session)
    if request.method == 'POST':
        username = session["username"]
        userid = WishlistModel.getUID(username)
        itemid = request.get_json()['id']
        data = WishlistModel(userid, itemid)
        data.insertintoWistlist()

        return "Succes", 200
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            return render_template('wishlist.html')
    return render_template('wishlist.html')
    # return render_template('login.html')

@app.route('/account/wishlist')
def getaccountwishlist():
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            uid = WishlistModel.getUID(session["username"])
            items = WishlistModel.getWishListProductIDs(uid)
            data = ItemModel.get_all_items()
            data = filter(lambda x: x.id in items, data)
            data = map(lambda x: x.toDict(), data)
            data = list(data)
            return jsonify(data)
    return [], 400

@app.route('/products/<id>')
def productsdetail(id):
    return render_template('products.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    
    print('shit: ' + request.method)
    if request.method == 'POST':
        username = request.form['username'] 
        password = request.form['password']
        email = request.form['email']
        postal_code = request.form['postal_code']
        house_number = request.form['house_number']
        account = AccountModel(username, password, email, postal_code, house_number)
        result = AccountModel.insertAccount(account)
        if result:
            return "Succes"
        return "Failed"
    return render_template('register.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    print(request.method)

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        result = AccountModel.checkAccount(username, password)
        if result:          
            session["username"] = username
            session.permanent = True
            print("hoi ")
            #return redirect(url_for('index'))
            redirect_to_index = redirect(url_for('index'))
            response = app.make_response(redirect_to_index)
            #Adding data to the cookie
            query = "select Adminbool from User_ where User_Name = '{0}'".format(str(username))
            adminbool = MySQLdatabase.ExecuteQuery(query)
            adminbool = adminbool[0]
            response.set_cookie('user', username +'='+ str(adminbool[0])+'=')            
            

            return response
        return "401", 401 
    return render_template('login.html')

@app.route('/panda')
def panda():
    return render_template('404.html')
    
# junk
@app.route('/accounts')
def accounts():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')

    accounts = AccountModel.getAllUsers()
    accounts = map(lambda x: x.toDict(), accounts)
    accounts = list(accounts)
    return jsonify(accounts)
# end junk

@app.route('/logout')
def logout():
    session.clear()
    redirect_to_index = redirect(url_for('index'))
    response = app.make_response(redirect_to_index)
    response.set_cookie('user', '', expires=0)
    return response

@app.route('/items')

def items():

    items = ItemModel.get_all_items()
    # items = WishlistModel.get_allWishlistItems()

    id = request.args.get("id")
    name = request.args.get("name")
    min = request.args.get("min")
    max = request.args.get("max")
    continent = request.args.get("continent")
    classification = request.args.get("class")
    onlyinstock = request.args.get("in_stock")

    if id != None:
        items = filter(lambda x: x.hasId(id), items)

    if name != None:
        items = filter(lambda x: x.hasName(name), items)

    if min != None and max != None:
        items = filter(lambda x: x.inPriceRange(float(min),float(max)), items)
     
    if continent != None:
        items = filter(lambda x: x.hasContinent(continent), items)

    if onlyinstock != None:
        items = filter(lambda x: x.inStock(onlyinstock), items)

    if classification != None:
        items = filter(lambda x: x.hasClassification(classification), items)

    items = map(lambda x: x.toDict(), items)
    items = list(items)
    return jsonify(items)

@app.route('/adminpage')
def adminpage():
    return render_template('adminpage.html')

@app.route('/AdminPageGetUsers', methods = ['GET', 'POST'])
def AdminPageGetUsers():
    if request.method == 'GET':
        allUsers = AccountModel.getAllUsers()
        allUsers = map(lambda x: x.toDict(), allUsers)
        allUsers = list(allUsers)
        return jsonify(allUsers)

@app.route('/GetOneUser')
def GetOneUser():
    TheUser = request.args.get("username")
    print("\n\n\n"+TheUser+"\n\n\n\n")
    TheUser = AccountModel.getOneUser(TheUser)
    if type(TheUser) is AccountModel:
        return jsonify(TheUser.toDict())
    else:
        return jsonify({"Username is not found"})


if __name__ == '__main__':
    app.run(threaded=True, host="localhost")
