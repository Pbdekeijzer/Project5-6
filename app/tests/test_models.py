import unittest
from unittest import mock
from app.models.AccountModel import *

class TestAccount(unittest.TestCase):
    def setUp(self):
        self.account = AccountModel(username = "John", password = "Snow", email = "john_snow@email.com", postal_code="1111QQ", house_number=1)
        self.account.insertAccount()
        self.uid = AccountModel.getUID(self.account.username)

    def test_init(self):
        self.assertEqual(self.account.username, "John")
        self.assertEqual(self.account.password, "Snow")
        self.assertEqual(self.account.email, "john_snow@email.com")
        self.assertEqual(self.account.postal_code, "1111QQ")
        self.assertEqual(self.account.house_number, 1)
        self.assertEqual(self.account.adminbool, 0)
        self.assertEqual(self.account.privacywishlist, 1)
        self.assertEqual(self.account.blockedbool, 0)

    def test_toDict(self):
        dictionary = {
            "uid": 0,
            "username": "John",
            "password": "Snow",
            "email": "john_snow@email.com",
            "postal_code": "1111QQ",
            "house_number": 1,
            "adminbool": 0,
            "privacywishlist": 1,
            "blockedbool": 0 
        }
        self.assertEqual(self.account.toDict(), dictionary)

    def test_getUID(self):
        uid = AccountModel.getUID(self.account.username)
        self.assertEqual(type(uid), type(100))
    
    def testOneUser(self):
        user = AccountModel.getOneUser(self.account.username)
        self.assertEqual(self.account.uid, user.uid)
        
    def tearDown(self):
        MySQLdatabase.ExecuteSafeInsertQuery("DELETE FROM User_ WHERE User_Name = %s", self.account.username)
    

    