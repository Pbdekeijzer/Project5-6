from Order import *
from MySQLdatabase import *
__author__ = 'Stef'


class HistoryModel:
    def __init__(self, user_id):
        self.user_id = user_id

    def get_order_history(self):
        query = "SELECT o.Order_ID, o.Time_of_order_placed, obi.Product_ID " \
                "FROM Order_ as o, Order_Buyable_item_ as obi " \
                "WHERE o.Order_ID = obi.Order_ID AND o.Related_to_person = {0}".format(int(self.user_id))
        result = MySQLdatabase.ExecuteQuery(query)

        orders = []
        for i in result:
            if i[0] not in [item.id for item in orders]:
                orders += [Order(i[0], i[2])]
            else:
                for item in orders:
                    if item.id == i[0]:
                        item.add(i[2])
        return orders

# example

# n = [(1,1), (1,2), (2,3)]

# o = []

# for i in n:
#    if i[0] not in [item.id for item in o]:
#        o += [Order(i[0], i[1])]
#    else:
#        for item in o:
#            if item.id == i[0]:
#                item.add(i[1])

# for x in o:
#    print(x.id)
#    print(x.item)
