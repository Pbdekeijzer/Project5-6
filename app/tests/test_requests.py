import unittest
from unittest import mock
from unittest.mock import patch, MagicMock, Mock
from app import app
from app.models.AccountModel import *
from app.models.HistoryModel import *

class TestRequests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.account = AccountModel(username="Henk", password="Test")

    def tearDown(self):
        pass

    def test_index(self):
        rv = self.app.get('/')
        assert b'Only in stock' in rv.data

    def test_purchase_history(self):
        mock_account = AccountModel
        mock_account.checkifExists = mock.MagicMock(return_value=True)

        mock_history = HistoryModel
        mock_history.get_order_history = mock.MagicMock(return_value="Something")
        
        rv = self.app.get('/account/testuser/history')

        assert b'Something' in rv.data

    def login(self, username, password):
        return self.app.post('/login', data=dict(
            username=username,
            password=password
        ), follow_redirects=True)

    def logout(self):
        return self.app.get('/logout', follow_redirects=True)

    def test_login_logout(self):
        rv = self.login('hoi', 'hoi')
        assert b'You were logged in' in rv.data
        rv = self.logout()
        assert b'You were logged out' in rv.data
        rv = self.login('adminx', 'default')




    

    