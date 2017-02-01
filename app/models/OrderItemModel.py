import json
from flask import jsonify
import os
from app.MySQLdatabase import *

class OrderItemModel():
    def __init__(self, order_id, product_id, amount = 0, favourited = 0):
        self.order_id = order_id
        self.product_id = product_id
        self.amount = amount
        self.favourited = favourited

    def toDict(self):
        return {
            "order_id" : self.order_id,
            "product_id" : self.product_id,
            "amount" : self.amount,
            "favourited" : self.favourited
        }

    #add item to ordered items, return bool
    def AddOrderItem(self):
        query = "INSERT INTO Order_Buyable_item_ VALUES(%s, %s, %s, %s)"
        MySQLdatabase.ExecuteSafeInsertQuery(query, self.order_id, self.product_id, self.amount, self.favourited)
        return True