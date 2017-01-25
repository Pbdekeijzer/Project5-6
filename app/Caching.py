from flask import request

class CacheClass:
    def __init__(self):
        self.TheCache = {}


    def caching(self):
        def caching_decorator(func):
            def wrapper(*args, **kwargs):
                key = str(args) + str(kwargs) + request.path + request.query_string
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