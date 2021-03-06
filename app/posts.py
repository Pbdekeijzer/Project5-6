from flask import Blueprint, request, make_response, jsonify, render_template, session, redirect, url_for
from app.models.AccountModel import *
from app.models.FavouritesModel import *
from app.models.HistoryModel2 import *
from app.models.ItemModel import *
#from app.models.Order import *
from app.models.OrderItemModel import *
from app.models.StatisticsModel import *
from app.models.WishlistModel import *
from app.auth.authenticate import *
from app.EventSystem import *
import json

posts = Blueprint('Posts', __name__, template_folder="templates", static_folder="static")

@posts.route('/wishlist', methods=['GET', 'POST'])
@authenticate_user
def wishlist(userid):
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
            ItemModel.update_Stock(item_id, item_quantity)
            orderItem = OrderItemModel(order_id, item_id, item_quantity, 0)
            OrderItemModel.AddOrderItem(orderItem)       
        GlobalEvents.OrderHistoryUpdate.Call()
    return "Succes"

@posts.route('/change_settings', methods = ['GET', 'POST'])
@authenticate_user
def change_settings(userid):
    if request.method == 'POST':
        AccountModel.updatePrivacy(session["username"])
    return str(AccountModel.checkPrivacy(session["username"]))

@posts.route('/AdminPageGetUsers', methods = ['GET', 'POST'])
def AdminPageGetUsers():
    return redirect('/accounts', 302)

@posts.route('/UpdateOneUser')
@authenticate_admin
def UpdateOneUser():
    query = "UPDATE User_ SET Wachtwoord = %s, Email_address = %s, Postal_code = %s, House_number = %s, Adminbool = %s, Privacy_wishlist = %s, Blockedbool = %s where User_Name = %s"
    w8woord = request.args.get("password")
    mail = request.args.get("email")
    pcode = request.args.get("postalcode")
    houseno = request.args.get("housenumber")
    adminbool = request.args.get("adminbool")
    secretwish = request.args.get("privacywishlist")
    blockedbool = request.args.get("blockedbool")
    gamertag = request.args.get("username")

    GlobalEvents.UserUpdate.Call()
    result = MySQLdatabase.ExecuteSafeInsertQuery(query, w8woord, mail, pcode, houseno, adminbool, secretwish, blockedbool, gamertag)
    if result == True:
        return jsonify({"CommitSuccess":"User is successfully updated"})
    else:
        return jsonify({"CommitSuccess":"User not updated, are all the fields correct?"})

@posts.route('/DeleteOneUser')
@authenticate_admin
def DeleteOneUser():
    username = request.args.get("username")
    result = MySQLdatabase.ExecuteSafeInsertQuery("DELETE FROM User_ WHERE User_Name = %s", username)
    if result == True:
        GlobalEvents.UserUpdate.Call()
        return jsonify({"CommitSuccess": "User is successfully deleted"})
    else:
        return jsonify({"CommitSuccess": "User not deleted, is the username correct?"})

@posts.route('/UpdateUsername')
@authenticate_admin
def UpdateUsername():
    oldUsername = request.args.get("oldusername")
    newUsername = request.args.get("newusername")
    resultBool = MySQLdatabase.ExecuteSafeInsertQuery("UPDATE User_ SET User_Name = %s WHERE User_Name = %s", newUsername, oldUsername)
    if resultBool == True:
        GlobalEvents.UserUpdate.Call()
        return jsonify({"CommitSuccess":"Username is successfully updated from "+oldUsername+" to "+newUsername})
    else:
        return jsonify({"CommitSuccess": "User not deleted, is the original username correct?"})