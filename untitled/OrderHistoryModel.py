__author__ = 'Stef'

class OrderHistoryModel():
    def __init__(self, product_id, title, price, image_route, amount):
        self.product_id = product_id
        self.title = title
        self.price = price
        self.image_route = image_route
        self.amount = amount

    def toDict(self):
        return {
            "product_id" : self.product_id,
            "title" : self.title,
            "price" : self.price,
            "image_route" : self.image_route,
            "amount" : self.amount
        }