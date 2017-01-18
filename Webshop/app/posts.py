from flask import Blueprint, request, make_response, jsonify, render_template, session, redirect, url_for
from app.models.AccountModel import *
from app.models.FavouritesModel import *
from app.models.HistoryModel import *
from app.models.ItemModel import *
from app.models.Order import *
from app.models.OrderItemModel import *
from app.models.StatisticsModel import *
from app.models.WishlistModel import *
from app.auth.authenticate import *
import json

posts = Blueprint('Posts', __name__, template_folder="templates", static_folder="static")

@posts.route('/wishlist', methods=['GET', 'POST'])
@authenticate_user
def wishlist(userid):
    print(session)
    if request.method == 'POST':
        itemid = request.get_json()['id']
        data = WishlistModel(userid, itemid)
        data.insertintoWistlist()
        return "Succes", 200
    return render_template('wishlist.html')

@posts.route('/account/<username>', methods=['GET', 'POST'])
@authenticate_user
def accountpanel(userid, username):
    return render_template('user.html')

@posts.route('/favourites', methods=['GET', 'POST'])
@authenticate_user
def favourites(userid):
    if request.method == 'POST':
        itemid = request.get_json()['id']
        data = FavouritesModel(userid, itemid)
        data.insertintoFavourites()
        return "Succes", 200
    return render_template('favourites.html')

@posts.route('/order', methods=['GET', 'POST'])
@authenticate_user
def order(userid):
    """TODO: Add history to this route [GET]."""  
    if request.method == 'POST':
        HistoryModel.insertOrder(userid)
        order_id = HistoryModel.getlastOrder()
        orderArray = request.json
        for i in orderArray:
            item_id = i[0]
            item_quantity = i[3]
            orderItem = OrderItemModel(order_id, item_id, item_quantity, 0)
            OrderItemModel.AddOrderItem(orderItem)       
    return "Succes"

@posts.route('/change_settings', methods = ['GET', 'POST'])
@authenticate_user
def change_settings():
    if request.method == 'POST':
        AccountModel.updatePrivacy(session["username"])
    return str(AccountModel.checkPrivacy(session["username"]))

@posts.route('/AdminPageGetUsers', methods = ['GET', 'POST'])
def AdminPageGetUsers():
    if request.method == 'GET':
        allUsers = AccountModel.getAllUsers()
        allUsers = map(lambda x: x.toDict(), allUsers)
        allUsers = list(allUsers)
        return jsonify(allUsers)