import unittest
from unittest import mock
from unittest.mock import MagicMock
from app.models.AccountModel import *
from app.models.WishlistModel import *
from app.models.HistoryModel import *
from app.models.OrderItemModel import *

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
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(1, "test", "test", "test@test.nl", "2222KT", 12, 0, 0, 0)])
        user = AccountModel.getOneUser("test")
        self.assertEqual(user.uid, 1)

class TestWishlist(unittest.TestCase):
    def setUp(self):
        # are these needed?
        # self.dummyAccount = AccountModel(username="WillyTest", password="Wonka", email="willy_wonka@test.com", postal_code="2222TK", house_number=1)   
        # self.dummyItem = ItemModel(id=9999, name="testBunny", description="Is a testbunny", price=200.50, image="test_path.jpg", continent="Europa", in_stock=200, class_="Choco")
        self.wishlist = WishlistModel(user_id = 5, product_id = 9999)

    def test_init(self):
        self.assertEqual(self.wishlist.user_id, 5)
        self.assertEqual(self.wishlist.product_id, 9999)

    def test_toDict(self):
        dictionary = {
            "User_ID": 5,
            "Product_ID": 9999
        }
        self.assertEqual(self.wishlist.toDict(), dictionary)

    #insertintoWistlist() -todo

    @mock.patch("app.models.WishlistModel.MySQLdatabase")
    def test_getWishListProductIDs(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(10, 4, 2, 1, 5)])
        wishlist_pids = WishlistModel.getWishListProductIDs(5)
        self.assertEqual(wishlist_pids[0], 10)

    @mock.patch("app.models.WishlistModel.MySQLdatabase")
    def test_get_allWishlistItems(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(1, "testItem", "This is a test item", 240, 115, "Asia", "Fish", "random_route.jpg")])
        wishlist = WishlistModel.get_allWishlistItems(1)
        self.assertEqual(wishlist[0].name, "testItem")

class TestOrderItem(unittest.TestCase):
    def setUp(self):
        self.orderItem = OrderItemModel(order_id = 7, product_id = 9, amount = 5, favourited = 0)

    def test_init(self):
        self.assertEqual(self.orderItem.order_id, 7)
        self.assertEqual(self.orderItem.product_id, 9)
        self.assertEqual(self.orderItem.amount, 5)
        self.assertEqual(self.orderItem.favourited, 0)

    def test_toDict(self):
        dictionary = {
            "order_id" : 7,
            "product_id" : 9,
            "amount" : 5,
            "favourited" : 0
        }
        self.assertEqual(self.orderItem.toDict(), dictionary)

    #AddOrderItem() -todo

class TestHistory(unittest.TestCase):
    def setUp(self):
        self.history = HistoryModel(user_id = 12)

    def test_init(self):
        self.assertEqual(self.history.user_id, 12)

    @mock.patch("app.models.HistoryModel.MySQLdatabase")
    def test_get_order_history(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(5, 12, 14)])
        history = HistoryModel.get_order_history(self.history)
        self.assertEqual(history[0].id, 12)

    #insertOrder() -todo

    @mock.patch("app.models.HistoryModel.MySQLdatabase")
    def test_getlastOrder(self, mock_msqldb): #add stuff to the return_value
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(67, 99, 12)])
        last_order = HistoryModel.getlastOrder()
        self.assertEqual(last_order, 67)




        