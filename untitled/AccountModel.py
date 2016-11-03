import json
from flask import jsonify
from MySQLdatabase import *
import os

class AccountModel():

    accountlst = []

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    @staticmethod    
    def getAllUsers():
        with open('users.json') as users:
            accounts = json.load(users)
            AccountModel.accountlst = []
            for item in accounts:
                AccountModel.accountlst.append(AccountModel(item["username"], item["password"], item["email"]))
            return AccountModel.accountlst

    def hasUsername(string):
        return string in self.username

    def hasEmail(string):
        return string in self.email

    def toDict(self):
        return {
            "username" : self.username,
            "password" : self.password,
            "email" : self.email
        }     

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

            query = "SELECT User_Name FROM User_ WHERE '{0}' = User_Name".format(str(username))
            hasResult = MySQLdatabase.ExecuteQuery(query)
            print(hasResult)

            if not hasResult:
                query = "INSERT INTO User_(Privacy_wishlist, Adminbool, User_Name, Wachtwoord, Email_address) VALUES (True, False, '"+username+"', '"+password+"', '"+email+"');"
                print(query)
                MySQLdatabase.ExecuteInsertQuery(query)
                return True
            return False
            
            