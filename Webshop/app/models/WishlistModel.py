import json
from flask import jsonify
from app.MySQLdatabase import *
import os
from ItemModel import *


class WishlistModel():

	wishlistitems = []
	wishlistlst = []
	wishlistpids = []
	
	def __init__(self, user_id, product_id):
		self.user_id = user_id
		self.product_id = product_id
		
	def toDict(self):
		return {
			"User_ID" : self.user_id,
			"Product_ID" : self.product_id
		}


	def insertintoWistlist(self):
		query = "SELECT User_ID FROM User_Wishlist_ WHERE User_ID = {0} AND Product_ID = {1}".format(int(self.user_id), int(self.product_id))
		checkexisting = MySQLdatabase.ExecuteQuery(query)

		if not checkexisting:
			query = "INSERT INTO User_Wishlist_ VALUES('{0}', '{1}')".format(int(self.user_id), int(self.product_id))
			MySQLdatabase.ExecuteInsertQuery(query)
			return True

		query = "DELETE FROM User_Wishlist_ WHERE User_ID = '{0}' AND Product_ID = '{1}'".format(int(self.user_id), int(self.product_id))
		checkexisting = MySQLdatabase.DeleteQuery(query)
		return False

	@staticmethod
	def getWishListProductIDs(user_id):
		query = "SELECT Product_ID FROM User_Wishlist_ WHERE User_ID = '{0}'".format(int(user_id))
		result = MySQLdatabase.ExecuteQuery(query)
		print("in getwish")
		WishlistModel.wishlistpids = []
		for i in result:
			WishlistModel.wishlistpids.append(i[0])
		return WishlistModel.wishlistpids
		
	@staticmethod
	def get_allWishlistItems(user_id):
		pid_list = WishlistModel.getWishListProductIDs(user_id)
		WishlistModel.wishlistitems = []
		for pid in pid_list:
			query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = '{0}'".format(int(pid))
			result = MySQLdatabase.ExecuteQuery(query)
			for i in result:
				WishlistModel.wishlistitems.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))
			print("Finished")

		return WishlistModel.wishlistitems	

	
	
	