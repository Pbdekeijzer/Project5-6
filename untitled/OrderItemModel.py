import json
from flask import jsonify
import os
from MySQLdatabase import *

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

    def AddOrderItem(self):
        query = "INSERT INTO Order_Buyable_item_ VALUES('{0}', '{1}', '{2}', '{3}')".format(int(self.order_id), int(self.product_id), int(self.amount), int(self.favourited))
        MySQLdatabase.ExecuteInsertQuery(query)
        return True