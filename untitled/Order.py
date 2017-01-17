__author__ = 'Stef'
from MySQLdatabase import *
from ItemModel import *
from OrderHistoryModel import *

class Order:
    def __init__(self, id, item):
        self.id = id
        self.item = [item]
        self.item_models = []
        self.item_amount = []

    def add(self, item):
        self.item.append(item)

    def get_all_ordered_items(self):
        for product_id in self.item:
            query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = '{0}'".format(int(product_id))
            query2 = "SELECT Amount FROM Order_Buyable_item_ WHERE Order_ID = '{0}' AND Product_ID = '{1}'".format(int(self.id), int(product_id))
            result = MySQLdatabase.ExecuteQuery(query)
            result2 = MySQLdatabase.ExecuteQuery(query2)
            for i in result:
                #Product_ID, Title, Price, Image_route
                self.item_models.append(OrderHistoryModel(i[0], i[1], i[4], i[7]).toDict())
                self.item_amount.append(result2[0])
                print(result2[0])
        return self.to_order_dict()

    def to_order_dict(self):
        return{
                "order": self.id,
                "items": self.item_models,
                "amount": self.item_amount
        }
