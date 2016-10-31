import json
from flask import jsonify
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

    def insertAccount(AccountModel):
        with open('users.json') as users:
            write = json.load(users)
            write.append(AccountModel.toDict())
            