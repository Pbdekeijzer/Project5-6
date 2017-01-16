import json
from flask import jsonify
from MySQLdatabase import *
import os

class AccountModel():

    def __init__(self, uid = 0, username = None, password = None, email = None, postal_code = None, house_number = None, adminbool = 0, privacywishlist = 1):
        self.uid = uid
        self.username = username
        self.password = password
        self.email = email
        self.postal_code = postal_code
        self.house_number = house_number
        self.adminbool = adminbool
        self.privacywishlist = privacywishlist

    def toDict(self):
        return {
            "uid" : self.uid,
            "username" : self.username,
            "password" : self.password,
            "email" : self.email,
            "postal_code" : self.postal_code,
            "house_number" : self.house_number,
            "adminbool" : self.adminbool,
            "privacywishlist" : self.privacywishlist
        }     
    
    @staticmethod
    def getUID(username):
        query = "SELECT User_ID FROM User_ WHERE User_Name = '{0}'".format(str(username))
        print("in uid")
        result =  MySQLdatabase.ExecuteQuery(query)
        userid = result[0]
        userid = userid[0]
        return userid

    @staticmethod
    def getOneUser(UserItsName):
        Result = MySQLdatabase.SelectQuery('*','User_','User_Name = "'+ UserItsName + '"')
        try:
            return AccountModel(Result[0][0], Result[0][3], Result[0][4], Result[0][5], Result[0][6], Result[0][7], Result[0][2], Result[0][1])
        except IndexError:
            return "Name is not found"



    @staticmethod
    def getAllUsers():
        query = "SELECT * FROM User_ ORDER BY User_Name"
        result = MySQLdatabase.ExecuteQuery(query)
        accountlst = []
        for i in result:
            accountlst.append(AccountModel(i[0], i[3], i[4], i[5], i[6], i[7], i[2], i[1]))
        return accountlst

    @staticmethod
    def checkifExists(username):
        query = "SELECT User_Name FROM User_ WHERE '{0}' = User_Name".format(str(username))
        result = MySQLdatabase.ExecuteQuery(query)
        if result:
            return True
        return False

    @staticmethod    
    def checkAccount(username, password):
        query = "SELECT User_Name FROM User_ WHERE '{0}' = User_Name AND '{1}' = Wachtwoord".format(str(username), str(password))
        result = MySQLdatabase.ExecuteQuery(query)
        if result:
            return True
        return False    

    @staticmethod
    def checkPrivacy(username):
        query = "SELECT Privacy_wishlist FROM User_ WHERE '{0}' = User_Name".format(str(username))
        result = MySQLdatabase.ExecuteQuery(query)
        print(result[0][1])
        if 1 == int(result[0][1]):
            return True
        return False
    
    @staticmethod
    def updatePrivacy(username):
        val = 0
        if not AccountModel.checkPrivacy(username):
            val = 1
        query = "UPDATE User_ SET Privacy_wishlist = '{value}' WHERE '{name}' = User_Name".format(value = val, name = username)
        MySQLdatabase.UpdateQuery(query)

    def insertAccount(self):
            query = "SELECT User_Name FROM User_ WHERE '{0}' = User_Name".format(str(self.username))
            hasResult = MySQLdatabase.ExecuteQuery(query)

            if not hasResult:
                query = "INSERT INTO User_(Privacy_wishlist, Adminbool, User_Name, Wachtwoord, Email_address, Postal_code, House_number) VALUES (True, False, '{username}', '{password}', '{email}', '{postal_code}','{house_number}');".format(username = self.username, password = self.password, email = self.email, postal_code = self.postal_code, house_number = self.house_number)
                print(query)
                MySQLdatabase.ExecuteInsertQuery(query)
                return True
            return False
            
            