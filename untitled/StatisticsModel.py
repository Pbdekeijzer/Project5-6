import json
from flask import jsonify
import os
from MySQLdatabase import *
from calendar import monthrange

class TurnoverStats():
    def __init__(self, amount, date):
        self.amount = amount
        self.date = date

    @staticmethod
    def getTurnover(year, month):
        query = ""
        maxDate = 0
        if month != None:
            query = r"""select sum(Z.Total), day(Z.Date) as NewDate from
            (select X.Date, X.amount * X.Price as Total from 
            (Select O.Date, O.Amount, BI.Price from 
            (select O.Order_ID, O.Related_to_person, Date(O.Time_of_order_placed) as Date, OBI.Amount, OBI.Product_ID from Order_ as O join Order_Buyable_item_ as OBI on O.Order_ID = OBI.Order_ID) as O join
            Buyable_item_ as BI on O.Product_ID=BI.Product_ID) as X
            group by X.Date, X.Price) as Z
            where Year(Z.Date) = {0} and month(Z.Date) = {1}
            group by NewDate order by NewDate"""
            query = query.format(year, month)
            maxDate = monthrange(int(year), int(month))[1]
        
        else:            
            query = r"""select sum(Z.Total), month(Z.Date) as NewDate from
            (select X.Date, X.amount * X.Price as Total from 
            (Select O.Date, O.Amount, BI.Price from 
            (select O.Order_ID, O.Related_to_person, Date(O.Time_of_order_placed) as Date, OBI.Amount, OBI.Product_ID from Order_ as O join Order_Buyable_item_ as OBI on O.Order_ID = OBI.Order_ID) as O join
            Buyable_item_ as BI on O.Product_ID=BI.Product_ID) as X
            group by X.Date, X.Price) as Z
            where Year(Z.Date) = {0}
            group by NewDate order by NewDate"""
            query = query.format(year)
            maxDate = 12
        
        result = MySQLdatabase.ExecuteQuery(query)
        lst = []
        lastdate = 0
        for i in result:
            while(int(i[1]) > lastdate + 1):
                lst.append(TurnoverStats(0, lastdate + 1))
                lastdate += 1
            lst.append(TurnoverStats(int(i[0]), int(i[1])))
            lastdate = int(i[1])
        
        while lastdate < maxDate:
            lst.append(TurnoverStats(0, lastdate + 1))
            lastdate += 1

        return lst

    def toDict(self):
        return {
            "xAxis":self.date,
            "amount":self.amount
        }

class WishlistStats():
    def __init__(self, id, name, amount):
        self.id = id
        self.name = name
        self.amount = amount

    @staticmethod
    def getMostWishedItems(maxAmount):
        query = r"""SELECT count(W.Product_ID) as Total, Title, W.Product_ID
         FROM `User_Wishlist_` as W left join Buyable_item_ as B 
         on W.Product_ID=B.Product_ID group by Title order by Total desc limit {0}"""
        query = query.format(maxAmount)
        result = MySQLdatabase.ExecuteQuery(query)
        lst = []
        for i in result:
            lst.append(WishlistStats(int(i[2]), i[1], int(i[0])))
        return lst

    def toDict(self):
        return {
            "id":self.id,
            "xAxis":self.name,
            "amount":self.amount
        }

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
            "xAxis":self.date
        }
    