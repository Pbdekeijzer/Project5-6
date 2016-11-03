import json
from flask import jsonify
import os
from MySQLdatabase import *



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

    @staticmethod
    def get_all_items():
        result = MySQLdatabase.SelectAllQuery("*", "Buyable_item_")
        ItemModel.itemlst = []
        for i in result:
            ItemModel.itemlst.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))

        return ItemModel.itemlst
    
    def hasId(self, string):
        return string in self.id

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
    