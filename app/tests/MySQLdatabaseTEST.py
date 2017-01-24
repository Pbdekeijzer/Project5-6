import unittest
from unittest import mock
from app.models.AccountModel import *

class TestMySQLdatabase(unittest.TestCase):
    def TestExecuteSafeSelectQuery(self):
        Query = 'SELECT User_Name FROM User_ WHERE User_Name = %s ORDER BY User_Name'
        arg = 'hoi'
        result = MySQLdatabase.ExcecuteSafeSelectQuery(Query, arg)
        self.assertEqual(result[0][0], 'hoi')

    def TestExecuteSafeInsertQuery(self):
        Query = "INSERT INTO User_(Privacy_wishlist, Adminbool, User_Name, Wachtwoord, Email_address, Postal_code, House_number, Blockedbool) VALUES (True, False, %s, %s, %s, %s,%s, FALSE)"
        username = 'Jopie'
        password = 'imanunittest'
        email = 'iman@unittest.com'
        postalcode = '8956AT'
        housenumber = 2
        didthequerywork = MySQLdatabase.ExecuteSafeInsertQuery(Query, username, password, email, postalcode, housenumber)
        self.assertTrue(didthequerywork)

    def tearDown(self):
        MySQLdatabase.ExecuteSafeInsertQuery("DELETE FROM User_ WHERE User_Name = 'Jopie'")