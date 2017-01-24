__author__ = 'Stef'
from app.MySQLdatabase import *
from app.models.OrderHistoryModel import *

class Order:
    def __init__(self, time, id, item):
        self.id = id
        self.time = time
        self.item = [item]
        self.item_models = []
        self.item_amount = 0

    def add(self, item):
        self.item.append(item)

    def get_all_ordered_items(self):
        for product_id in self.item:

            query = "SELECT Buyable_item_.*, obi.Amount " \
                    "FROM Buyable_item_, Order_Buyable_item_ as obi " \
                    "WHERE Buyable_item_.Product_ID = obi.Product_ID " \
                    "AND obi.Product_ID= %s " \
                    "AND obi.Order_ID = %s"

            #query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = '{0}'".format(int(product_id))
            #query2 = "SELECT Amount FROM Order_Buyable_item_ WHERE Order_ID = '{0}' AND Product_ID = '{1}'".format(int(self.id), int(product_id))
            result = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.id, product_id)
            #result2 = MySQLdatabase.ExecuteQuery(query2)
            for i in result:
                #Product_ID, Title, Price, Image_route
                self.item_models.append(OrderHistoryModel(i[0], i[1], i[4], i[7], i[8]).toDict())
        return self.to_order_dict()

    def to_order_dict(self):
        return{
                "order": self.id,
                "time" : self.time,
                "items": self.item_models
        }
