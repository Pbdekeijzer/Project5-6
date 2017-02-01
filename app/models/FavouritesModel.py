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

    #Get user_id and return int (user_id)
    Cache_getUID = CacheClass()     
    GlobalEvents.FavouritesUpdate.Register(lambda: FavouritesModel.Cache_getUID.clearCache(), "Clear_FavouritesProductIDS_Cache") 
    @staticmethod
    @Cache_getUID.caching()
    def getUID(username):
        query = "SELECT User_ID FROM User_ WHERE User_Name = %s"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
        userid = result[0]
        userid = userid[0]
        return userid

    #Insert in or deletes from favourites, return bool
    def insertintoFavourites(self):
        GlobalEvents.FavouritesUpdate.Call()
        #Check if the favourite already exists
        query = "SELECT User_ID FROM User_Favourites_ WHERE User_ID = %s AND Product_ID = %s"
        checkexisting = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.user_id, self.product_id)

        #if it doesn't exist yet, insert into favourites
        if not checkexisting:
            query = "INSERT INTO User_Favourites_ VALUES(%s, %s)"
            MySQLdatabase.ExecuteSafeInsertQuery(query, self.user_id, self.product_id)
            return True

        #else, delete item from favourites
        checkexisting = MySQLdatabase.ExecuteSafeInsertQuery(
            "DELETE FROM User_Favourites_ WHERE User_ID = %s AND Product_ID = %s", self.user_id, self.product_id)
        return False

    #Get all productids from the favourite list, return int[]
    Cache_FavouritesProductIDS = CacheClass()     
    GlobalEvents.FavouritesUpdate.Register(lambda: FavouritesModel.Cache_FavouritesProductIDS.clearCache(), "Clear_FavouritesProductIDS_Cache") 
    @staticmethod
    @Cache_FavouritesProductIDS.caching()
    def getFavouritesProductIDs(user_id):
        query = "SELECT Product_ID FROM User_Favourites_ WHERE User_ID = %s"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, user_id)
        FavouritesModel.favouritespids = []
        for i in result:
            FavouritesModel.favouritespids.append(i[0])
        return FavouritesModel.favouritespids

    #Get all items from favourites, return ItemModel[]
    Cache_FavouritesItems = CacheClass()     
    GlobalEvents.FavouritesUpdate.Register(lambda: FavouritesModel.Cache_FavouritesItems.clearCache(), "Clear_FavouritesProductIDS_Cache") 
    @staticmethod
    @Cache_FavouritesItems.caching()
    def get_allFavouritesItems(user_id):
        pid_list = FavouritesModel.getFavouritesProductIDs(user_id)
        FavouritesModel.favouritesitems = []
        for pid in pid_list:
            query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = %s"
            result = MySQLdatabase.ExcecuteSafeSelectQuery(query, pid)
            for i in result:
                FavouritesModel.favouritesitems.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))
        return FavouritesModel.favouritesitems
