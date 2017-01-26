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

    def test_GetOneUserOptionOne(self):
        mock_account = AccountModel
        mock_account.getOneUser = Mock(return_value=[("Name is not found")])
        rv = self.app.get('/GetOneUser')
        print(rv.data)
        assert b'Username is not found' in rv.data

    def test_GetOneUserOptionTwo(self):
        mock_account = AccountModel
        mock_account.getOneUser = Mock(return_value=[(87, 'Jopiejo', 'testje', 'test@test.test', '4564TR', 34, 1,1,1)])
        rv = self.app.get('/GetOneUser')
        print(rv.data)
        assert b'Jopiejo' in rv.data


    def test_index(self):
        rv = self.app.get('/')
        assert b'Only in stock' in rv.data

    def test_purchase_history(self):
        mock_account = AccountModel
        mock_account.checkifExists = mock.MagicMock(return_value=True)

        mock_history = HistoryModel
        mock_history.get_order_history = Mock(return_value="Something")
        
        rv = self.app.get('/account/testuser/history')

        assert b'Something' in rv.data

    def login(self, username, password):
        return self.app.post('/login', data=dict(
            username=username,
            password=password
        ), follow_redirects=True)

    def logout(self):
        return self.app.get('/logout', follow_redirects=True)



    

    