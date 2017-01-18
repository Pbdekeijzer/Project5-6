import json
from flask import jsonify
import os
from MySQLdatabase import *

class OrderItemModel():
    #product_id, title, price, image_route, amount
    def __init__(self, product_id, title, price, image_route, amount, order_id = None, favourited = 0):
        self.product_id = product_id
        self.title = title
        self.price = price
        self.image_route = image_route
        self.amount = amount
        self.order_id = order_id
        self.favourited = favourited

    def toDict(self):
        return {
            "product_id" : self.product_id,
            "title" : self.title,
            "price" : self.price,
            "image_route" : self.image_route,
            "amount" : self.amount
        }

    def AddOrderItem(self):
        query = "INSERT INTO Order_Buyable_item_ VALUES('{0}', '{1}', '{2}', '{3}')".format(int(self.order_id), int(self.product_id), int(self.amount), int(self.favourited))
        MySQLdatabase.ExecuteInsertQuery(query)
        return True