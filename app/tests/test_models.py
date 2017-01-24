import unittest
from unittest import mock
from unittest.mock import MagicMock
from app.models.AccountModel import *

class TestAccount(unittest.TestCase):
    def setUp(self):
        self.account = AccountModel(username = "John", password = "Snow", email = "john_snow@email.com", postal_code="1111QQ", house_number=1)

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

    @mock.patch("app.models.AccountModel.MySQLdatabase")
    def test_getUID(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(1,)])
        uid = AccountModel.getUID("test")
        self.assertEqual(uid, 1)

    @mock.patch("app.models.AccountModel.MySQLdatabase")
    def test_getOneUser(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(1, "fag", "fag", "fag@fag.nl", "2222KK", 12, 0, 0, 0)])
        user = AccountModel.getOneUser("fag")
        self.assertEqual(user.uid, 1)

class TestWishlist(unittest.TestCase):
    def setUp(self):

        self.dummyAccount = AccountModel(username="WillyTest", password="Wonka", email="willy_wonka@test.com", postal_code="2222TK", house_number=1)   
        dummyItem = ItemModel(id=9999, name="testBunny", description="Is a testbunny", price=200.50, image="test_path.jpg", continent="Europa", in_stock=200, class_="Choco")
        self.wishlist = WishlistModel(self.dummyUID, dummyItem.id)

        def test_toDict(self):
            dictionary = {
                "User_ID": "",
                "Product_ID": "" 
            }
