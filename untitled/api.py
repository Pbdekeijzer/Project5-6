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
        userid = AccountModel.getUID(username)
        itemid = request.get_json()['id']
        data = WishlistModel(userid, itemid)
        data.insertintoWistlist()

        return "Succes", 200
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            return render_template('wishlist.html')
    return render_template('wishlist.html')

@app.route('/account/<username>', methods=['GET', 'POST'])
def accountpanel(username):
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            uid = AccountModel.getUID(session["username"])
            return render_template('user.html')
        return "Account doesn't exist!"
    return "You need to log in to view your settings!"

@app.route('/<username>/wishlist')
def userwishlist(username):
    if "username" in session or not AccountModel.checkPrivacy(username):
        uid = AccountModel.getUID(username)
        items = WishlistModel.getWishListProductIDs(uid)
        data = ItemModel.get_all_items()
        data = filter(lambda x: x.id in items, data)
        data = map(lambda x: x.toDict(), data)
        data = list(data)
        return jsonify(data)
    return "no........"

@app.route('/wishlist/<username>')
def uwl(username):
    if AccountModel.checkifExists(session["username"]):
        return render_template('wishlist.html')

@app.route('/account/wishlist')
def getaccountwishlist():
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            uid = AccountModel.getUID(session["username"])
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

@app.route('/cart', methods=['GET', 'POST'])
def cart():
    if request.method == 'POST':
        if AccountModel.checkifExists(session["username"]):
            uid = AccountModel.getUID(session["username"])
            


    return render_template('cart.html')

@app.route('/register', methods=['GET', 'POST'])
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

@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        result = AccountModel.checkAccount(username, password)
        if result:          
            session["username"] = username
            session.permanent = True
            redirect_to_index = redirect(url_for('index'))
            response = app.make_response(redirect_to_index)
            response.set_cookie('user', username)            
            return response
        return "401", 401 
    return render_template('login.html')
    
@app.route('/accounts')
def accounts():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')

    accounts = AccountModel.getAllUsers()
    accounts = map(lambda x: x.toDict(), accounts)
    accounts = list(accounts)
    return jsonify(accounts)

@app.route('/change_settings', methods = ['GET', 'POST'])
def change_settings():
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            if request.method == 'POST':
                AccountModel.updatePrivacy(session["username"])
            return str(AccountModel.checkPrivacy(session["username"]))

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

if __name__ == '__main__':
    app.run(threaded=True, host="localhost")
