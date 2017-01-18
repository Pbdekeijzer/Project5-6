__author__ = 'Stef'
from app.MySQLdatabase import *
from ItemModel import *

class Order:
    def __init__(self, id, item):
        self.id = id
        self.item = [item]
        self.item_models = []

    def add(self, item):
        self.item.append(item)

    def get_all_ordered_items(self):
        for product_id in self.item:
            query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = '{0}'".format(int(product_id))
            result = MySQLdatabase.ExecuteQuery(query)
            for i in result:
                self.item_models.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]).toDict())
        return self.to_order_dict()

    def to_order_dict(self):
        return{
                "order": self.id,
                "items": self.item_models
        }
