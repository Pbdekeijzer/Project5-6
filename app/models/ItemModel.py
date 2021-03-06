import json
from flask import jsonify
import os
from app.EventSystem import *
from app.Caching import *
from app.MySQLdatabase import *



class ItemModel():

    itemlst = []
    
    def __init__(self, id, name, description, price, image, continent, in_stock, class_):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.image = image
        self.continent = continent
        self.in_stock = in_stock
        self.class_ = class_

    #get all the items, return ItemModel[]
    Cache_getAllItems = CacheClass()     
    GlobalEvents.ItemUpdate.Register(lambda: ItemModel.Cache_getAllItems.clearCache(), "Clear_GetAllItems_Cache") 
    @staticmethod
    @Cache_getAllItems.caching()
    def get_all_items():
        query = "SELECT * FROM Buyable_item_"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query)
        ItemModel.itemlst = []
        for i in result:
            ItemModel.itemlst.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))

        return ItemModel.itemlst
    
    #check the stock of an item, return bool
    @staticmethod
    def check_Stock(id, amount):
        query = "SELECT In_stock FROM Buyable_item_ WHERE Product_ID = %s"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, id)
        if ((result[0][0] - amount) < 0):
           return False
        return True

    #update the stock of an item, return bool
    @staticmethod
    def update_Stock(id, amount):
        GlobalEvents.ItemUpdate.Call()
        query = "UPDATE Buyable_item_ SET In_stock = (In_stock - %s) WHERE Product_ID = %s"
        MySQLdatabase.ExecuteSafeInsertQuery(query, amount, id) #fix this
        return True

    #check if every value is accepted
    def hasId(self, string):
        return string == str(self.id)

    def hasName(self, string):
        return string.lower() in self.name.lower()
    
    def hasDescription(self, string):
        return string in self.description

    def inPriceRange(self, min, max):
        return min <= float(self.price) <= max

    def hasContinent(self, array):
        return self.continent in array
    
    def inStock(self, in_stock):
        return self.in_stock > 0

    def hasClassification(self, string):
        return string in self.class_

    def toDict(self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "price":self.price,
            "image":self.image,
            "continent":self.continent,
            "in_stock":self.in_stock,
            "class":self.class_
    }
    