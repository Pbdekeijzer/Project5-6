import unittest
from unittest import mock
from unittest.mock import MagicMock
from app.models.AccountModel import *
from app.models.WishlistModel import *
from app.models.HistoryModel2 import *
from app.models.OrderItemModel import *
from app.models.FavouritesModel import *
from app.models.ItemModel import *
from app.models.StatisticsModel import *

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

    #insertintoWistlist -else
    @mock.patch("app.models.WishlistModel.MySQLdatabase")
    def test_insertintoWistlistFalse(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(5,)])
        self.assertEqual(self.wishlist.user_id, 5)
        test = self.wishlist.insertintoWistlist()
        self.assertEqual(test, False)    

    #insertintoWistlist -if
    @mock.patch("app.models.WishlistModel.MySQLdatabase")
    def test_insertintoWistlistTrue(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = None)
        self.assertNotEqual(self.wishlist.user_id, 13)
        test = self.wishlist.insertintoWistlist()
        self.assertEqual(test, True)

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

    #AddOrderItem() -todo ornot

class TestHistory(unittest.TestCase):
    def setUp(self):
        self.history = HistoryModel(user_id = 12)

    def test_init(self):
        self.assertEqual(self.history.user_id, 12)

    @mock.patch("app.models.HistoryModel2.MySQLdatabase")
    def test_get_order_history(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(12, 200, "link", 450, 19, "string", 12)])
        history = self.history.get_order_history()
        self.assertEqual(history[0].get('items')[0].get('title'), 'string')

    #insertOrder() -todo ornot

    @mock.patch("app.models.HistoryModel2.MySQLdatabase")
    def test_getlastOrder(self, mock_msqldb): #add stuff to the return_value
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(67, 99, 12)])
        test = HistoryModel.getlastOrder()
        self.assertEqual(test, 67)

class TestFavourite(unittest.TestCase):
    def setUp(self):
        self.favourite = FavouritesModel(user_id = 19, product_id = 14)

    def test_init(self):
        self.assertEqual(self.favourite.user_id, 19)
        self.assertEqual(self.favourite.product_id, 14)
    
    def test_toDict(self):
        dictionary = {
            "User_ID" : 19,
            "Product_ID" : 14
        }
        self.assertEqual(self.favourite.toDict(), dictionary)

    @mock.patch("app.models.FavouritesModel.MySQLdatabase")
    def test_getUID(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(13,)])
        userid = FavouritesModel.getUID("Unit")
        self.assertEqual(userid, 13)

    #1 for function insertintoFavourites --else
    @mock.patch("app.models.FavouritesModel.MySQLdatabase")
    def test_insertintoFavouritesFalse(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(19,)])
        self.assertEqual(self.favourite.user_id, 19)
        test = self.favourite.insertintoFavourites()
        self.assertEqual(test, False)

    # 2 for function insertintoFavourites --if ?????
    @mock.patch("app.models.FavouritesModel.MySQLdatabase")
    def test_insertintoFavouritesSecond(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = None)
        self.assertNotEqual(self.favourite.user_id, 13)
        test = self.favourite.insertintoFavourites()
        self.assertEqual(test, True)
    
    @mock.patch("app.models.FavouritesModel.MySQLdatabase")
    def test_getFavouritesProductIDs(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(77,)])
        productid = FavouritesModel.getFavouritesProductIDs("Dora")
        self.assertEqual(productid[0], 77)

    @mock.patch("app.models.FavouritesModel.MySQLdatabase")
    def test_get_allFavouritesItems(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(1, "testItem", "This is a test item", 240, 115, "Asia", "Fish", "random_route.jpg"),])
        favourite_list = FavouritesModel.get_allFavouritesItems("The Explorer")
        self.assertEqual(favourite_list[0].id, 1)

class TestItem(unittest.TestCase):
    def setUp(self):
        self.item = ItemModel(id = 1, name = "Brightside", description = "This is Mr. Brightside -The Killers", price = 350, image = "bright-side.jpg", continent = "Europe", in_stock = 1, class_ = "Mammal")

    def test_init(self):
        self.assertEqual(self.item.id, 1 )
        self.assertEqual(self.item.name, "Brightside")
        self.assertEqual(self.item.description, "This is Mr. Brightside -The Killers")
        self.assertEqual(self.item.price, 350)
        self.assertEqual(self.item.image, "bright-side.jpg")
        self.assertEqual(self.item.continent, "Europe")
        self.assertEqual(self.item.in_stock, 1)
        self.assertEqual(self.item.class_, "Mammal")

    def test_toDict(self):
        dictionary = {
            "id" : 1,
            "name" : "Brightside",
            "description": "This is Mr. Brightside -The Killers",
            "price": 350,
            "image": "bright-side.jpg",
            "continent": "Europe",
            "in_stock": 1,
            "class": "Mammal"
        }
        self.assertEqual(self.item.toDict(), dictionary)

    @mock.patch("app.models.ItemModel.MySQLdatabase")
    def test_get_all_items(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(1, "testItem", "This is a test item", 240, 115, "Asia", "Fish", "random_route.jpg"),])
        items = ItemModel.get_all_items()
        self.assertEqual(items[0].id, 1)

    #check_Stock --else
    @mock.patch("app.models.ItemModel.MySQLdatabase")
    def test_check_StockTrue(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(100,)])
        test = ItemModel.check_Stock(5, 5)
        self.assertTrue(test)
    # Vraag : 1 functie of 2 funties?
    #check_Stock --if
    @mock.patch("app.models.ItemModel.MySQLdatabase")
    def test_check_StockFalse(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(3,)])
        test = ItemModel.check_Stock(5, 5)
        self.assertFalse(test)
    #update_Stock() -todo

    #all filter functions -todo
    def test_hasId(self):
        self.assertTrue(self.item.hasId("1"))

    def test_hasName(self):
        self.assertTrue(self.item.hasName("BrightSide"))
    
    def test_hasDescription(self):
        self.assertTrue(self.item.hasDescription("This is Mr. Brightside -The Killers"))
    
    def test_inPriceRange(self):
        self.assertTrue(self.item.inPriceRange(0, 500))
    
    def test_hasContinent(self):
        self.assertTrue(self.item.hasContinent("Europe"))

    def test_inStock(self):
        self.assertTrue(self.item.inStock(1))
    
    def test_hasClassification(self):
        self.assertTrue(self.item.hasClassification("Mammal"))

class TestTurnover(unittest.TestCase):
    def setUp(self):
        self.turnover = TurnoverStats(amount = 5000, date = 5)

    def test_init(self):
        self.assertEqual(self.turnover.amount, 5000)
        self.assertEqual(self.turnover.date, 5)

    def test_toDict(self):
        dictionary = {
            "xAxis" : 5,
            "amount" : 5000
        }
        self.assertEqual(self.turnover.toDict(), dictionary)

    @mock.patch("app.models.StatisticsModel.MySQLdatabase")
    def test_getTurnover(self, mock_msqldb):
        mock_msqldb.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(15000, 4)])
        turnover = TurnoverStats.getTurnover(2014, 4)
        self.assertEqual(turnover[3].amount, 15000)

class TestStatisticsModel(unittest.TestCase):
    def setUp(self):
        self.statistics = StatisticsModel(100, 10)
    
    def test_init(self):
        self.assertEqual(self.statistics.amount, 100)
        self.assertEqual(self.statistics.date, 10)
    
    @mock.patch("app.models.StatisticsModel.MySQLdatabase")
    def test_get_sales_per_month(self, mock_db):
        mock_db.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(18, 1), (13, 2)])
        sales = StatisticsModel.get_sales_per_month(1, 2017)
        self.assertEqual(sales[1].amount, 13)

    @mock.patch("app.models.StatisticsModel.MySQLdatabase")
    def test_get_sales_per_day(self, mock_db):
        mock_db.ExcecuteSafeSelectQuery.return_value = [(10,1), (20,2), (30, 3)]
        sales = StatisticsModel.get_sales_per_day(1, 1, 2017)
        self.assertEqual(sales[2].amount, 30)

    def test_toDict(self):
        dictionary = {
            "amount" : 100,
            "xAxis" : 10
        }
        self.assertEqual(self.statistics.toDict(), dictionary)


class TestWishlistStats(unittest.TestCase):
    def setUp(self):
        self.wishliststats = WishlistStats(1, "harry", 2)
    
    def test_init(self):
        self.assertEqual(self.wishliststats.id, 1)
        self.assertEqual(self.wishliststats.name, "harry")
        self.assertEqual(self.wishliststats.amount, 2)

    @mock.patch("app.models.StatisticsModel.MySQLdatabase")
    def test_getMostWishedItems(self, db_mock):
        db_mock.ExcecuteSafeSelectQuery = mock.MagicMock(return_value = [(10, "henk", 1)])
        wished_item = WishlistStats.getMostWishedItems(50)
        self.assertEqual(wished_item[0].id, 1)

    def test_toDict(self):
        dictionary = {
            "id": 1,
            "xAxis": "harry",
            "amount": 2
        }
        self.assertEqual(self.wishliststats.toDict(), dictionary)