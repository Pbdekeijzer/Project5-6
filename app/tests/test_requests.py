import unittest
from unittest import mock
from unittest.mock import patch, MagicMock, Mock
from app import app
from app.models.AccountModel import *
from app.models.HistoryModel2 import *

class TestRequests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.account = AccountModel(username="Henk", password="Test")

    def tearDown(self):
        pass

    def test_index(self):
        rv = self.app.get('/')
        assert b'Only in stock' in rv.data

    def test_products_id(self):
        rv = self.app.get('/products/5')
        assert b'Copyright' in rv.data

    def test_cart(self):
        self.login('hoi', 'hoi')
        rv = self.app.get('/cart')
        assert b'Total Price' in rv.data

    # def login(self, username, password):
    #     return self.app.post('/login', data=dict(
    #         username=username,
    #         password=password
    #     ), follow_redirects=True)

    # def logout(self):
    #     return self.app.get('/logout', follow_redirects=True)





    

    