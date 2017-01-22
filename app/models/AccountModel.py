import json
from flask import jsonify
from app.MySQLdatabase import *
import os
import logging


class AccountModel():
    def __init__(self, uid=0, username=None, password=None, email=None, postal_code=None, house_number=None,
                 adminbool=0, privacywishlist=1, blockedbool=0):
        self.uid = uid
        self.username = username
        self.password = password
        self.email = email
        self.postal_code = postal_code
        self.house_number = house_number
        self.adminbool = adminbool
        self.privacywishlist = privacywishlist
        self.blockedbool = blockedbool

    def toDict(self):
        return {
            "uid": self.uid,
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "postal_code": self.postal_code,
            "house_number": self.house_number,
            "adminbool": self.adminbool,
            "privacywishlist": self.privacywishlist,
            "blockedbool": self.blockedbool
        }

    @staticmethod
    def getUID(username):
        result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT * FROM User_ WHERE User_Name = %s",username)
        userid = result[0]
        userid = userid[0]
        return userid

    @staticmethod
    def getOneUser(UserItsName):
        #Result = MySQLdatabase.SelectWhereUsernameQuery(UserItsName)
        Result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT * FROM User_ WHERE User_Name = %s", UserItsName)
        try:
            return AccountModel(Result[0][0], Result[0][3], Result[0][4], Result[0][5], Result[0][6], Result[0][7],
                                Result[0][2], Result[0][1], Result[0][8])
        except IndexError:
            return "Name is not found"

    @staticmethod
    def isAdmin(username):
        query = "SELECT Adminbool FROM User_ WHERE %s = User_Name"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
        return result[0][0] == 1

    @staticmethod
    def getAllUsers():
        query = "SELECT * FROM User_ ORDER BY User_Name"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query)
        accountlst = []
        for i in result:
            accountlst.append(AccountModel(i[0], i[3], i[4], i[5], i[6], i[7], i[2], i[1], i[8]))
        return accountlst

    @staticmethod
    def checkifExists(username):
        result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT * FROM User_ WHERE User_Name = %s", username)
        if result:
            return True
        return False

    @staticmethod
    def checkAccount(username, password):
        result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT User_Name FROM User_ WHERE User_Name = %s and Wachtwoord = %s" ,username, password)
        if result:
            return True
        return False

    @staticmethod
    def checkPrivacy(username):
        print(username)
        query = "SELECT Privacy_wishlist FROM User_ WHERE %s = User_Name"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
        return result[0][0] == 1


    @staticmethod
    def updatePrivacy(username):
        val = 0
        if not AccountModel.checkPrivacy(username):
            val = 1
        query = "UPDATE User_ SET Privacy_wishlist = %s WHERE %s = User_Name"
        MySQLdatabase.ExecuteSafeInsertQuery(query, val, username)

    def insertAccount(self):
        query = "SELECT User_Name FROM User_ WHERE %s = User_Name"
        hasResult = MySQLdatabase.ExcecuteSafeSelectQuery(query, self.username)

        if not hasResult:
            query = "INSERT INTO User_(Privacy_wishlist, Adminbool, User_Name, Wachtwoord, Email_address, Postal_code, House_number, Blockedbool) VALUES (True, False, %s, %s, %s, %s,%s, FALSE)"
            print(query)
            MySQLdatabase.ExecuteSafeInsertQuery(query, self.username, self.password, self.email, self.postal_code, self.house_number)
            return True
        return False

