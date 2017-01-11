__author__ = 'Stef'
from ItemModel import *


class FavouritesModel():

	favouritesitems = []
	favouriteslst = []
	favouritespids = []

	def __init__(self, user_id, product_id):
		self.user_id = user_id
		self.product_id = product_id

	def toDict(self):
		return {
			"User_ID" : self.user_id,
			"Product_ID" : self.product_id
		}

	@staticmethod
	def getUID(username):
		query = "SELECT User_ID FROM User_ WHERE User_Name = '{0}'".format(str(username))
		print("in uid")
		result =  MySQLdatabase.ExecuteQuery(query)
		userid = result[0]
		userid = userid[0]
		return userid

	def insertintoFavourites(self):
		query = "SELECT User_ID FROM User_Favourites_ WHERE User_ID = {0} AND Product_ID = {1}".format(int(self.user_id), int(self.product_id))
		checkexisting = MySQLdatabase.ExecuteQuery(query)

		if not checkexisting:
			query = "INSERT INTO User_Favourites_ VALUES('{0}', '{1}')".format(int(self.user_id), int(self.product_id))
			MySQLdatabase.ExecuteInsertQuery(query)
			return True

		query = "DELETE FROM User_Favourites_ WHERE User_ID = '{0}' AND Product_ID = '{1}'".format(int(self.user_id), int(self.product_id))
		checkexisting = MySQLdatabase.DeleteQuery(query)
		return False

	@staticmethod
	def getFavouritesProductIDs(user_id):
		query = "SELECT Product_ID FROM User_Favvourites_ WHERE User_ID = '{0}'".format(int(user_id))
		result = MySQLdatabase.ExecuteQuery(query)
		print("in getFavourites")
		FavouritesModel.favouritespids = []
		for i in result:
			FavouritesModel.favouritespids.append(i[0])
		return FavouritesModel.favouritespids

	@staticmethod
	def get_allFavouritesItems(user_id):
		pid_list = FavouritesModel.getFavouritesProductIDs(user_id)
		FavouritesModel.favouritesitems = []
		for pid in pid_list:
			query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = '{0}'".format(int(pid))
			result = MySQLdatabase.ExecuteQuery(query)
			for i in result:
				FavouritesModel.favouritesitems.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))
			print("Finished")

		return FavouritesModel.favouritesitems