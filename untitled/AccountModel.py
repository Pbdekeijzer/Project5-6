import json
from flask import jsonify
from MySQLdatabase import *
import os

class AccountModel():

    def __init__(self, username, password, email, postal_code, house_number, adminbool, privacywishlist):
        self.username = username
        self.password = password
        self.email = email
        self.postal_code = postal_code
        self.house_number = house_number
        self.adminbool = adminbool
        self.privacywishlist = privacywishlist

    def toDict(self):
        return {
            "username" : self.username,
            "password" : self.password,
            "email" : self.email,
            "postal_code" : self.postal_code,
            "house_number" : self.house_number,
            "adminbool" : self.adminbool,
            "privacywishlist" : self.privacywishlist
        }     

    @staticmethod
    def getAllUsers():
        query = "SELECT * FROM User_"
        result = MySQLdatabase.ExecuteQuery(query)
        accountlst = []
        for i in result:
            accountlst.append(AccountModel(i[3], i[4], i[5], i[6], i[7], i[2], i[3]))
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
    def insertAccount(AccountModel):
            username = AccountModel.username
            password = AccountModel.password
            email = AccountModel.email
            postal_code = AccountModel.postal_code
            house_number = AccountModel.house_number

            query = "SELECT User_Name FROM User_ WHERE '{0}' = User_Name".format(str(username))
            hasResult = MySQLdatabase.ExecuteQuery(query)
            print(hasResult)

            if not hasResult:
                query = "INSERT INTO User_(Privacy_wishlist, Adminbool, User_Name, Wachtwoord, Email_address, Postal_code, House_number) VALUES (True, False, '"+username+"', '"+password+"', '"+email+"', '"+postal_code+"','"+house_number+"');"
                print(query)
                MySQLdatabase.ExecuteInsertQuery(query)
                return True
            return False
            
            