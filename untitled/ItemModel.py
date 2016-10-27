import json
from flask import jsonify


class ItemModel():

    itemlst = []

    def __init__(self, id, name, description, price, classification, image):
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
            return shit

    @staticmethod
    def filter_item_name(name, list):
        output = [item for item in ItemModel.itemlst if item.name == name]
        return json.loads(json.dumps([o.__dict__ for o in output]))
    
    @staticmethod
    def filter_item_price(min, max, list):
        output = [item for item in ItemModel.itemlst if (min <= float(item.price) <= max)]
        return json.loads(json.dumps([o.__dict__ for o in output]))

    @staticmethod
    def filter_item_classifiction(classification, list):
        output = [item for item in ItemModel.itemlst if item.classification == classification]
        return json.loads(json.dumps([o.__dict__ for o in output]))
"""
$.ajax({
    type: "GET",
    url: "http://localhost:8080/products?name=shit",
    success: function(json) {

    }
}"""