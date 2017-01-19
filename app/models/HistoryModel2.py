from app.models.Order import *
from app.MySQLdatabase import *
__author__ = 'Stef'


class HistoryModel:
    def __init__(self, user_id):
        self.user_id = user_id

    def get_order_history(self):
        query = r"""Select O.Order_ID, OBI.Amount, BI.Image_route, BI.Price, BI.Product_ID, BI.Title from Buyable_item_ as BI
         join Order_Buyable_item_ as OBI on BI.Product_ID = OBI.Product_ID 
         join Order_ as O on OBI.Order_ID=O.Order_ID
        where O.Related_to_person = {0}"""
        query = query.format(self.user_id)
        result = MySQLdatabase.ExecuteQuery(query)


        orders = []
        items = []
        CurrentOrder = result[0][0]
        for i in result:
            if(CurrentOrder != i[0]):
                orders.append({"items": items,
                "order": CurrentOrder})
                CurrentOrder = i[0]
                items = []
            
            ThisItem = {
                "amount": i[1],
                "image_route": i[2],
                "price": i[3], 
                "product_id": i[4], 
                "title": i[5]
                }
            items.append(ThisItem)
        
        orders.append({"items": items,
        "order": CurrentOrder})
        return orders

    @staticmethod
    def insertOrder(uid):
        query = "INSERT INTO Order_(Related_to_person) VALUES ('{0}')".format(int(uid))
        MySQLdatabase.ExecuteInsertQuery(query)
        return True

    @staticmethod
    def getlastOrder():
        query = "SELECT * FROM Order_ order by Order_ID desc limit 1"
        result = MySQLdatabase.ExecuteQuery(query)
        print (result[0][0])
        return result[0][0]
