from flask import request

class CacheClass:
    def __init__(self):
        self.TheCache = {}


    def caching(self, doPathAndQuery = False):
        def caching_decorator(func):
            def wrapper(*args, **kwargs):
                if(doPathAndQuery):
                    key = CacheClass.TupleString(args) + CacheClass.TupleString(kwargs) + str(request.path) + str(request.query_string)
                else:
                    key = CacheClass.TupleString(args) + CacheClass.TupleString(kwargs)
                if key not in self.TheCache:
                    print("Added {0} to cache".format(key))
                    self.TheCache[key] = func(*args, **kwargs)
                else:
                    print("found {0} in cache".format(key))
                return self.TheCache[key]
            return wrapper
        return caching_decorator
    
    def clearCache(self):
        self.TheCache = {}

    @staticmethod
    def TupleString(tuple):
        string = ""
        for i in tuple:
            string += str(i) + ";"
        return string