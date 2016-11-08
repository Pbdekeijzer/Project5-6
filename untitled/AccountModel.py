import json
from flask import jsonify
from MySQLdatabase import *
import os

class AccountModel():

    accountlst = []

    def __init__(self, username, password, email, postal_code, house_number):
        self.username = username
        self.password = password
        self.email = email
        self.postal_code = postal_code
        self.house_number = house_number

    def toDict(self):
        return {
            "username" : self.username,
            "password" : self.password,
            "email" : self.email,
            "postal_code" : self.postal_code,
            "house_number" : self.house_number
        }     

    @staticmethod
    def getAllUsers():
        query = "SELECT * FROM User_"
        result = MySQLdatabase.ExecuteQuery(query)
        for i in result:
            AccountModel.accountlst.append(AccountModel(i[0], i[1], i[2], i[3], i[4]))
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
            
            