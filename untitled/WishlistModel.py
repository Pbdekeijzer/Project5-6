import json
from flask import jsonify
from MySQLdatabase import *
import os
from ItemModel import *


class WishlistModel():

	wishlistitems = []
	wishlistlst = []
	wishlistpids = []
	
	def __init__(self, user_id, product_id, order_in_list):
		self.user_id = user_id
		self.product_id = product_id
		self.order_in_list = order_in_list
		
	def toDict(self):
		return{
			"User_ID" : self.user_id,
			"Product_ID" : self.product_id,
			"Order_in_list" : self.order_in_list
		}
		
	@staticmethod
	def insertintoWistlist():
		user_ID = WishlistModel.user_id
		product_ID = WishlistModel.product_id
		Order = WishlistModel.order_in_list

		query = "SELECT User_ID FROM User_Wishlist_ WHERE User_Wishlist_.User_ID = {0} AND User_Wishlist_.Product_ID = {1}".format(str(user_id), str(product_id))
		checkexisting = MySQLdatabase.ExecuteQuery(query)

		if not checkexisting:
			query = "INSERT INTO User_Wishlist_ VALUES('"+user_ID+"', '"+Product_ID+"', '"+Order+"')"
			print(query)
			MySQLdatabase.ExecuteQuery(query)
			return True
		return False

	#User_ID = 9 is just an example
	@staticmethod
	def getWishListProductIDs():
		query = "SELECT Product_ID FROM User_Wishlist_ WHERE User_ID = 9"
		result = MySQLdatabase.ExecuteQuery(query)
		WishlistModel.wishlistpids = []
		for i in result:
			WishlistModel.wishlistpids.append(i[0])
			print(i)
		return WishlistModel.wishlistpids
		
	
	@staticmethod
	def get_allWishlistItems():

		pid_list = WishlistModel.getWishListProductIDs()
		WishlistModel.wishlistitems = []
		for pid in pid_list:
			query = "SELECT Buyable_item_.* FROM Buyable_item_ WHERE Buyable_item_.Product_ID = {0}".format(pid)
			result = MySQLdatabase.ExecuteQuery(query)
			for i in result:
				WishlistModel.wishlistitems.append(ItemModel(i[0], i[1], i[2], i[4], i[7], i[5], i[3], i[6]))
			print("Finished")

		return WishlistModel.wishlistitems	

	
	
	