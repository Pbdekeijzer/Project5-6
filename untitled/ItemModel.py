import json
from flask import jsonify
import os

class ItemModel():

    itemlst = []

    def __init__(self, id, name, description, price, classification, image, continent):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.classification = classification
        self.image = image
        self.continent = continent

    @staticmethod
    def get_all_items():
        with open('products.json') as json_data:
            shit = json.load(json_data)
            ItemModel.itemlst = []
            for i in shit:
                ItemModel.itemlst.append(ItemModel(i["id"], i["name"], i["description"], i["price"], i["class"], i["image"], i["continent"]))
            return ItemModel.itemlst
    
    def hasName(self, string):
        return string in self.name
    
    def hasId(self, string):
        return string in self.id

    def hasClassification(self, string):
        return string in self.classification

    def inPriceRange(self, min, max):
        return min <= float(self.price) <= max

    def hasContinent(self, array):
        return self.continent in array

    def toDict(self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "price":self.price,
            "image":self.image,
            "class":self.classification,
            "continent":self.continent
        }
    

