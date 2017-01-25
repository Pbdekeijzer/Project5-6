import unittest
from app import app
from app.auth.authenticate import *


class TestRequests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_index(self):
        rv = self.app.get('/')
        assert b'Only in stock' in rv.data


    

    