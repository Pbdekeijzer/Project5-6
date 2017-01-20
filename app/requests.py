from flask import Blueprint, request, make_response, jsonify, render_template, session, redirect, url_for
from app.models.AccountModel import *
from app.models.FavouritesModel import *
from app.models.HistoryModel2 import *
from app.models.ItemModel import *
from app.models.Order import *
from app.models.OrderItemModel import *
from app.models.StatisticsModel import *
from app.models.WishlistModel import *
from app.auth.authenticate import *
from app.auth.authenticate import *
import json

requests = Blueprint('Requests', __name__, template_folder="templates", static_folder="static")

@requests.route('/')
def index():
    return render_template('index.html')

@requests.route('/account/<username>/history')
@authenticate_user
def purchase_history(userid, username):
    if AccountModel.checkifExists(session["username"]):
        historyModel = HistoryModel(userid)
        data = historyModel.get_order_history()
        return jsonify(data)


@requests.route('/<username>/wishlist')
def userwishlist(username):
    def fetchdata():
        userid = AccountModel.getUID(username)
        items = WishlistModel.getWishListProductIDs(userid)
        data = ItemModel.get_all_items()
        data = filter(lambda x: x.id in items, data)
        data = map(lambda x: x.toDict(), data)
        data = list(data)
        return jsonify(data)
    if "username" in session:
        if session["username"] == username:
            return fetchdata()
        return "Username does not match"
    if not AccountModel.checkPrivacy(username):
        return fetchdata()
    return render_template('404.html')

@requests.route('/wishlist/<username>')
def uwl(username):
    if "username" in session and session["username"] == username:
        return render_template('publicwishlist.html')
    elif not AccountModel.checkPrivacy(username):
        return render_template('publicwishlist.html')
    return "Access denied, user wishlist is private."

@requests.route('/account/wishlist')
@authenticate_user
def getaccountwishlist(userid):
    items = WishlistModel.getWishListProductIDs(uid)
    data = ItemModel.get_all_items()
    data = filter(lambda x: x.id in items, data)
    data = map(lambda x: x.toDict(), data)
    data = list(data)
    return jsonify(data)

@requests.route('/account/favourites')
@authenticate_user
def getAccountFavourites(userid):
    items = FavouritesModel.getFavouritesProductIDs(userid)
    data = ItemModel.get_all_items()
    data = filter(lambda x: x.id in items, data)
    data = map(lambda x: x.toDict(), data)
    data = list(data)
    return jsonify(data)


@requests.route('/products/<id>')
def productsdetail(id):
    return render_template('products.html')

@requests.route('/cart')
def cart():
    return render_template('cart.html')

@requests.route('/graph')
def graph():
    return render_template("graph.html")

@requests.route('/stats')
@authenticate_admin
def stats():
    year = request.args.get("year")
    month = request.args.get("month")
    itemid = request.args.get("id")
    MaxWishlist = request.args.get("MaxWishlistItems")
    turnover = request.args.get("turnover")

    if turnover != None and year != None:
        results = TurnoverStats.getTurnover(year, month)
        items = map(lambda x: x.toDict(), results)
        items = list(items)
        return jsonify(items)

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

@requests.route('/accounts')
def accounts():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')

    accounts = AccountModel.getAllUsers()
    accounts = map(lambda x: x.toDict(), accounts)
    accounts = list(accounts)
    return jsonify(accounts)

@requests.route('/items')
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

@requests.route('/adminpage')
@authenticate_admin
def adminpage():
    return render_template('adminpage.html')

@requests.route('/GetOneUser')
def GetOneUser():
    TheUser = request.args.get("username")
    TheUser = AccountModel.getOneUser(TheUser)
    if isinstance(TheUser, str):  
        return jsonify({"username" : "Username is not found"})     
    else:
        return jsonify(TheUser.toDict())

