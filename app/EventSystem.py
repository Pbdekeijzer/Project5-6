class EventHandler():
    def __init__(self, name):
        self.Calls = []
        self.name = name

    def Register(self, Lambda, messagename):
        self.Calls.append([Lambda,messagename])
        print("Registered {0} to handler {1}".format(messagename, self.name))
    
    def Call(self):
        print("{0} was called".format(self.name))
        for i in self.Calls:
            i[0]()

class GlobalEvents():
    UserUpdate = EventHandler("UserUpdate")
    ItemUpdate = EventHandler("ItemUpdate")
    WishlistUpdate = EventHandler("WishlistUpdate")

'''
Demo
class Dummy():
    def __init__(self):
        return

    def printstuff(self, test):
        print("Called printstuff" + test)

eventh = EventHandler()
print("Made handler")
dumm = Dummy()
eventh.Register(lambda: dumm.printstuff("kutjes"))
print("Regitsered event")
eventh.Call()
print("Called event")
'''

