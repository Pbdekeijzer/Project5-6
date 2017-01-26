#from app.models.Order import *
from app.MySQLdatabase import *
from app.EventSystem import *
from app.Caching import *
__author__ = 'Stef'


class HistoryModel:
    def __init__(self, user_id):
        self.user_id = user_id


    def __str__(self):
        return str(self.user_id)


    def __unicode__(self):
        return str(self.user_id)


    Cache_getOrderHistory = CacheClass()     
    GlobalEvents.OrderHistoryUpdate.Register(lambda: HistoryModel2.Cache_getOrderHistory.clearCache(), "Clear_OrderHistory_Cache")
    @Cache_getOrderHistory.caching()
    def get_order_history(self):
        query = r"""Select O.Order_ID, OBI.Amount, BI.Image_route, BI.Price, BI.Product_ID, BI.Title, O.Time_of_order_placed from Buyable_item_ as BI
         join Order_Buyable_item_ as OBI on BI.Product_ID = OBI.Product_ID 
         join Order_ as O on OBI.Order_ID=O.Order_ID
        where O.Related_to_person = %s"""
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.user_id)


        orders = []
        items = []
        time = result[0][6]
        CurrentOrder = result[0][0]
        for i in range(0,len(result)):

            if(CurrentOrder != result[i][0]):
                orders.append({"items": items,
                "order": CurrentOrder,"time":time})
                CurrentOrder = result[i][0]
                time = result[i][6]                
                items = []
            
            ThisItem = {
                "amount": result[i][1],
                "image_route": result[i][2],
                "price": result[i][3], 
                "product_id": result[i][4], 
                "title": result[i][5]
                }
            items.append(ThisItem)
        
        orders.append({"items": items,
        "order": CurrentOrder, "time": time})
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
        return result[0][0]
