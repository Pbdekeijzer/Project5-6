import json
from flask import jsonify
from app.MySQLdatabase import *
import os
from app.models.ItemModel import *


class FavouritesModel:
    favouritesitems = []
    favouriteslst = []
    favouritespids = []

    def __init__(self, user_id, product_id):
        self.user_id = user_id
        self.product_id = product_id

    def toDict(self):
        return {
            "User_ID": self.user_id,
            "Product_ID": self.product_id
        }

    @staticmethod
    def getUID(username):
        query = "SELECT User_ID FROM User_ WHERE User_Name = %s"
        print("in uid")
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
        userid = result[0]
        userid = userid[0]
        return userid

    def insertintoFavourites(self):
        query = "SELECT User_ID FROM User_Favourites_ WHERE User_ID = %s AND Product_ID = %s"
        checkexisting = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.user_id, self.product_id)

        if not checkexisting:
            query = "INSERT INTO User_Favourites_ VALUES(%s, %s)"
            MySQLdatabase.ExecuteSafeInsertQuery(query, self.user_id, self.product_id)
            return True

        checkexisting = MySQLdatabase.ExecuteSafeInsertQuery(
            "DELETE FROM User_Favourites_ WHERE User_ID = %s AND Product_ID = %s", self.user_id, self.product_id)
        return False

    @staticmethod
    def getFavouritesProductIDs(user_id):
        query = "SELECT Product_ID FROM User_Favourites_ WHERE User_ID = %s"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, user_id)
        print("in getFavourites")
        FavouritesModel.favouritespids = []
        for i in result:
            FavouritesModel.favouritespids.append(i[0])
        return FavouritesModel.favouritespids

    @staticmethod
    def get_allFavouritesItems(user_id):
        pid_list = FavouritesModel.getFavouritesProductIDs(user_id)
        FavouritesModel.favouritesitems = []
        for pid in pid_list:
            query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = %s"
            result = MySQLdatabase.ExcecuteSafeSelectQuery(query, pid)
            for i in result:
                FavouritesModel.favouritesitems.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))
            print("Finished")

        return FavouritesModel.favouritesitems
