import json
from flask import jsonify
from app.MySQLdatabase import *
import os
import logging
from functools import wraps
from app.Caching import CacheClass
from app.EventSystem import *


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

    Cache_UID = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_UID.clearCache(), "Clear_User_UID_Cache")     
    @staticmethod
    @Cache_UID.caching()
    def getUID(username):
        print(username)
        print(MySQLdatabase)
        result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT User_ID FROM User_ WHERE User_Name = %s",username)
        print(result)
        return result[0][0]

    Cache_Users = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_Users.clearCache(), "Clear_Users_Cache") 
    @staticmethod
    @Cache_Users.caching()
    def getOneUser(UserItsName):
        Result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT * FROM User_ WHERE User_Name = %s", UserItsName)
        try:
            return AccountModel(Result[0][0], Result[0][3], Result[0][4], Result[0][5], Result[0][6], Result[0][7],
                                Result[0][2], Result[0][1], Result[0][8])
        except IndexError:
            return "Name is not found"

    Cache_Blocked = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_Blocked.clearCache(), "Clear_Blocked_Cache") 
    @staticmethod
    @Cache_Blocked.caching()
    def isBlocked(username):
        query = "SELECT Blockedbool FROM User_ WHERE %s = User_Name"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
        return result[0][0] == 1

    Cache_IsAdmin = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_IsAdmin.clearCache(), "Clear_IsAdmin_Cache") 
    @staticmethod
    @Cache_IsAdmin.caching()
    def isAdmin(username):
        query = "SELECT Adminbool FROM User_ WHERE %s = User_Name"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query, username)
        return result[0][0] == 1

    Cache_AllUsers = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_AllUsers.clearCache(), "Clear_AllUsers_Cache") 
    @staticmethod
    @Cache_AllUsers.caching()
    def getAllUsers():
        query = "SELECT * FROM User_ ORDER BY User_Name"
        result = MySQLdatabase.ExcecuteSafeSelectQuery(query)
        accountlst = []
        for i in result:
            accountlst.append(AccountModel(i[0], i[3], i[4], i[5], i[6], i[7], i[2], i[1], i[8]))
        return accountlst

    Cache_UserExists = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_UserExists.clearCache(), "Clear_UserExists_Cache") 
    @staticmethod
    @Cache_UserExists.caching()
    def checkifExists(username):
        result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT * FROM User_ WHERE User_Name = %s", username)
        if result:
            return True
        return False

    Cache_checkAccount = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_checkAccount.clearCache(), "Clear_checkAccount_Cache") 
    @staticmethod
    @Cache_checkAccount.caching()
    def checkAccount(username, password):
        result = MySQLdatabase.ExcecuteSafeSelectQuery("SELECT User_Name FROM User_ WHERE User_Name = %s and Wachtwoord = %s" ,username, password)
        if result:
            return True
        return False

    Cache_checkPrivacy = CacheClass()     
    GlobalEvents.UserUpdate.Register(lambda: AccountModel.Cache_checkPrivacy.clearCache(), "Clear_checkPrivacy_Cache") 
    @staticmethod
    @Cache_checkPrivacy.caching()
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

