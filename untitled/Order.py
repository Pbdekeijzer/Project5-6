__author__ = 'Stef'
from MySQLdatabase import *
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
        return self.item_models

    def to_order_dict(self):
        return{
                "order": self.id,
                "items": self.item_models
            }



# example

#n = [(1,1), (1,2), (2,3)]

#o = []

#for i in n:
#    if i[0] not in [item.id for item in o]:
#        o += [Order(i[0], i[1])]
#    else:
#        for item in o:
#            if item.id == i[0]:
#                item.add(i[1])

#for x in o:
#    print(x.id)
#    print(x.item)

