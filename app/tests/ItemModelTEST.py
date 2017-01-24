from app.MySQLdatabase import *
import unittest
from unittest import mock
from app.models.ItemModel import *

class TestItemModel(unittest.TestCase):
    def setUp(self):
        itemlst = []
        self.Item = ItemModel(id=0, name='testobject', description='im an testobject', price=400, image='idontknowanypath', continent='Europe', in_stock=4, class_='Mammal' )
