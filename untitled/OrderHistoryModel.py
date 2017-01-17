__author__ = 'Stef'

class OrderHistoryModel():
    def __init__(self, product_id, title, price, image_route):
        self.product_id = product_id
        self.title = title
        self.price = price
        self.image_route = image_route

    def toDict(self):
        return {
            "product_id" : self.product_id,
            "title" : self.title,
            "price" : self.price,
            "image_route" : self.image_route
        }