import unittest
from unittest import mock
from app.models.AccountModel import *

class TestAccount(unittest.TestCase):
    def setUp(self):
        self.account = AccountModel(uid = 100, username = "John", password = "Snow", email = "john_snow@email.com", postal_code="1111QQ", house_number=1)

    def test_init(self):
        self.assertEqual(self.account.username, "John")
        self.assertEqual(self.account.password, "Snow")
        self.assertEqual(self.account.email, "john_snow@email.com")
        self.assertEqual(self.account.postal_code, "1111QQ")
        self.assertEqual(self.account.house_number, 1)

    