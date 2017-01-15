import json
from flask import jsonify
from MySQLdatabase import *
import os

class AccountModel():

    accountlst = []

    def __init__(self, uid = 0, private_wishlist = 1, admin = 0, username = None, password = None, email = None, postal_code = None, house_number = None):
        self.username = username
        self.private_wishlist = private_wishlist
        self.uid = uid
        self.admin = admin
        self.password = password
        self.email = email
        self.postal_code = postal_code
        self.house_number = house_number

    def toDict(self):
        return {
            "uid" : self.uid,
            "private_wishlist" : self.private_wishlist,
            "admin" : self.admin,
            "username" : self.username,
            "password" : self.password,
            "email" : self.email,
            "postal_code" : self.postal_code,
            "house_number" : self.house_number
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
    def getAllUsers():
        query = "SELECT * FROM User_"
        result = MySQLdatabase.ExecuteQuery(query)
        for i in result:
            AccountModel.accountlst.append(AccountModel(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7]))
        return AccountModel.accountlst

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
        print(result[0][0])
        if 1 == int(result[0][0]):
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
            
            