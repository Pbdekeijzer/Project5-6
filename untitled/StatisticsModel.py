import json
from flask import jsonify
import os
from MySQLdatabase import *
from calendar import monthrange



class StatisticsModel():

    def __init__(self, amount, date):
        self.amount = amount
        self.date = date
    

    @staticmethod
    def get_sales_per_month(itemID, year):
        query = r"""select sum(Amount), month(Time) from (SELECT OB.Order_ID, Product_ID, Amount, Date(Time_of_order_placed)
         as Time from Order_Buyable_item_ as OB left join Order_ as O on OB.Order_ID=O.Order_ID where 
         Product_ID = {0}) as Old where YEAR(Time)={1} group by month(Time) order by month(Time)"""
        query = query.format(itemID, year)
        result = MySQLdatabase.ExecuteQuery(query)
        lst = []
        lastMonth = 0
        for i in result:
            while lastMonth + 1 < i[1]:
                lst.append(StatisticsModel(0, lastMonth+1))
                lastMonth += 1
            lst.append(StatisticsModel(int(i[0]), int(i[1])))
            lastMonth = i[1]
        
        while lastMonth <12:
            lst.append(StatisticsModel(0, lastMonth+1))
            lastMonth += 1

        return lst

    @staticmethod
    def get_sales_per_day(itemID, month, year):
        query = r"""select sum(Amount), day(Time) from (SELECT OB.Order_ID, Product_ID, Amount, Date(Time_of_order_placed)
         as Time from Order_Buyable_item_ as OB left join Order_ as O on OB.Order_ID=O.Order_ID where 
         Product_ID = {0}) as Old where YEAR(Time)={1} and month(Time) = {2} group by day(Time) order by day(Time)"""
        query = query.format(itemID, year, month)
        result = MySQLdatabase.ExecuteQuery(query)
        lst = []
        lastday = 0
        for i in result:
            while lastday + 1 < i[1]:
                lst.append(StatisticsModel(0, lastday+1))
                lastday += 1
            lst.append(StatisticsModel(int(i[0]), int(i[1])))
            lastday = i[1]

        daysinmonth = monthrange(int(year), int(month))
        while lastday < daysinmonth[1]:
            lst.append(StatisticsModel(0, lastday+1))
            lastday += 1

        return lst


    def toDict(self):
        return {
            "amount":self.amount,
            "date":self.date
        }
    