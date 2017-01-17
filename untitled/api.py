from flask import Flask, request, make_response, jsonify, render_template, session, redirect, url_for
from flask_cors import CORS, cross_origin
from ItemModel import *
from AccountModel import *
from WishlistModel import *
from StatisticsModel import *
from FavouritesModel import *
from HistoryModel import *
from OrderItemModel import *
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
            return render_template('user.html')
        return "Account doesn't exist!"
    return "You need to log in to view your settings!"

@app.route('/account/<username>/history')
def purchase_history(username):
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            user_id = AccountModel.getUID(session["username"])
            historyModel = HistoryModel(user_id)
            data = historyModel.get_order_history()
            data = [item.get_all_ordered_items() for item in data]
            return jsonify(data)


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
    if "username" in session and session["username"] == username:
        return render_template('wishlist.html')
    elif AccountModel.checkPrivacy(username):
        return render_template('wishlist.html')
    return ".."

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

@app.route('/favourites', methods=['GET', 'POST'])
def favourites():
    print(session)
    if request.method == 'POST':
        username = session["username"]
        userid = FavouritesModel.getUID(username)
        itemid = request.get_json()['id']
        data = FavouritesModel(userid, itemid)
        data.insertintoFavourites()
        return "Succes", 200
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            return render_template('favourites.html')
    return render_template('favourites.html')

@app.route('/account/favourites')
def getAccountFavourites():
    if "username" in session:
        if AccountModel.checkifExists(session["username"]):
            uid = FavouritesModel.getUID(session["username"])
            items = FavouritesModel.getFavouritesProductIDs(uid)
            data = ItemModel.get_all_items()
            data = filter(lambda x: x.id in items, data)
            data = map(lambda x: x.toDict(), data)
            data = list(data)
            return jsonify(data)
    return [], 400

@app.route('/products/<id>')
def productsdetail(id):
    return render_template('products.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'POST':
        print("lol")
        if AccountModel.checkifExists(session["username"]):
            uid = AccountModel.getUID(session["username"])
            HistoryModel.insertOrder(uid)
            order_id = HistoryModel.getlastOrder()
            orderArray = request.json
            for i in orderArray:
                print(i)
                item_id = i[0]
                item_name = i[1]
                item_price = i[2]
                item_quantity = i[3]
                print(item_id)
                print(item_name)
                print(item_price)
                print(item_quantity)
                orderItem = OrderItemModel(order_id, item_id, item_quantity, 0)
                OrderItemModel.AddOrderItem(orderItem)       
    return "Succes"

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

@app.route('/graph')
def graph():
    return render_template("graph.html")

@app.route('/stats')
def stats():
    year = request.args.get("year")
    month = request.args.get("month")
    itemid = request.args.get("id")
    MaxWishlist = request.args.get("MaxWishlistItems")

    if month == None and year != None and itemid != None:
        results = StatisticsModel.get_sales_per_month(itemid, year)
        items = map(lambda x: x.toDict(), results)
        items = list(items)
        return jsonify(items)

    if month != None and year != None and itemid != None:
        results = StatisticsModel.get_sales_per_day(itemid, month, year)
        items = map(lambda x: x.toDict(), results)
        items = list(items)
        return jsonify(items)
    
    if MaxWishlist != None:
        results = WishlistStats.getMostWishedItems(MaxWishlist)
        items = map(lambda x: x.toDict(), results)
        items = list(items)
        return jsonify(items)

    return "401", 401

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
    TheUser = AccountModel.getOneUser(TheUser)
    if type(TheUser) is AccountModel:
        return jsonify(TheUser.toDict())
    else:
        return jsonify({"username" : "Username is not found"})


if __name__ == '__main__':
    app.run(threaded=True, host="localhost")
