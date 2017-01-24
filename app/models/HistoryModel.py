from app.models.Order import *
from app.MySQLdatabase import *
__author__ = 'Stef'


class HistoryModel:
    def __init__(self, user_id):
        self.user_id = user_id

    def get_order_history(self):
        query = "SELECT o.Order_ID, o.Time_of_order_placed, obi.Product_ID FROM Order_ as o, Order_Buyable_item_ as obi WHERE o.Order_ID = obi.Order_ID AND o.Related_to_person = %s"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.user_id)

        orders = []
        for i in result:
            if i[0] not in [item.id for item in orders]:
                orders += [Order(i[0],i[1],i[2])]
            else:
                for item in orders:
                    if item.id == i[0]:
                        item.add(i[2])
        return orders

    @staticmethod
    def insertOrder(uid):
        query = "INSERT INTO Order_(Related_to_person) VALUES (%s)"
        MySQLdatabase.ExecuteSafeInsertQuery(query, uid)
        return True

    @staticmethod
    def getlastOrder():
        query = "SELECT * FROM Order_ order by Order_ID desc limit 1"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query)
        print (result[0][0])
        return result[0][0]

