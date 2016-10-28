import json
from flask import jsonify


class ItemModel():

    itemlst = []

    def __init__(self, id, name, description, price, classification, image):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.classification = classification
        self.image = image

    @staticmethod
    def get_all_items():
        with open('products.json') as json_data:
            shit = json.load(json_data)
            ItemModel.itemlst = []
            for i in shit:
                ItemModel.itemlst.append(ItemModel(i["id"], i["name"], i["description"], i["price"], i["class"], i["image"]))
            return ItemModel.itemlst
    
    def hasName(self, string):
        return string in self.name
    
    def hasId(self, string):
        return string in self.id

    def hasClassification(self, string):
        return string in self.classification

    def inPriceRange(self, min, max):
        return min <= float(self.price) <= max

    def toDict(self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "price":self.price,
            "image":self.image,
            "class":self.classification
        }
    
    @staticmethod
    def filter_item_price(min, max, list):
        output = [item for item in ItemModel.itemlst if (min <= float(item.price) <= max)]
        return json.loads(json.dumps([o.__dict__ for o in output]))

