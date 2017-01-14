__author__ = 'Stef'
from Order import *
from MySQLdatabase import *
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




