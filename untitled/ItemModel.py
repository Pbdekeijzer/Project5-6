import json
from flask import jsonify


class ItemModel():
    def __init__(self, name, description, price):
        self.name = name
        self.description = description
        self.price = price

    @staticmethod
    def get_all_items():
        with open('/home/hachiko/PycharmProjects/untitled/products.json') as json_data:
            return json.load(json_data)


    @staticmethod
    def filter_item_name(name):
        data = ItemModel.get_all_items()
        output = [item for item in data if item['name'] == name]
        return json.dumps(output)
    



"""
$.ajax({
    type: "GET",
    url: "http://localhost:8080/products?name=shit",
    success: function(json) {

    }
}"""