import json
from flask import jsonify
from app.MySQLdatabase import *
import os
from app.models.ItemModel import *


class WishlistModel():
    wishlistitems = []
    wishlistlst = []
    wishlistpids = []

    def __init__(self, user_id, product_id):
        self.user_id = user_id
        self.product_id = product_id

    def toDict(self):
        return {
            "User_ID": self.user_id,
            "Product_ID": self.product_id
        }

    def insertintoWistlist(self):
        query = "SELECT User_ID FROM User_Wishlist_ WHERE User_ID = %s AND Product_ID = %s"
        checkexisting = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.user_id, self.product_id)

        if not checkexisting:
            query = "INSERT INTO User_Wishlist_ VALUES(%s, %s)"
            MySQLdatabase.ExecuteSafeInsertQuery(query, self.user_id, self.product_id)
            return True

        checkexisting = MySQLdatabase.ExecuteSafeInsertQuery(
            "DELETE FROM User_Wishlist_ WHERE User_ID = %s AND Product_ID = %s", self.user_id, self.product_id)
        return False

    @staticmethod
    def getWishListProductIDs(user_id):
        query = "SELECT Product_ID FROM User_Wishlist_ WHERE User_ID = %s"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, user_id)
        WishlistModel.wishlistpids = []
        for i in result:
            WishlistModel.wishlistpids.append(i[0])

        return WishlistModel.wishlistpids

    @staticmethod
    def get_allWishlistItems(user_id):
        pid_list = WishlistModel.getWishListProductIDs(user_id)
        WishlistModel.wishlistitems = []
        for pid in pid_list:
            query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = %s"
            result = MySQLdatabase.ExcecuteSafeSelectQuery(query, pid)
            for i in result:
                WishlistModel.wishlistitems.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))
        return WishlistModel.wishlistitems
