from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from ItemModel import *
from AccountModel import *

app = Flask(__name__)
CORS(app)

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/products/<id>')

def productsdetail(id):
    return render_template('products.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    print('shit: ' + request.method)
    if request.method == 'POST':
        username = request.form['username'] 
        password = request.form['password']
        email = request.form['email']
        account = AccountModel(username, password, email)
        result = AccountModel.insertAccount(account)
        if result:
            return "Succes"
        return "Failed"
    return render_template('register.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    print(request.method)
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        result = AccountModel.checkAccount(username, password)
        if result:
            
        # user = db.find_user(username, password)
        # if not user -> raise error
        # response = redirect(url_for("userpage"))
        # response.set_cookie("shit", user.id)
        return False
    return render_template('login.html')
    
@app.route('/accounts')

def accounts():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')

    accounts = AccountModel.getAllUsers()
    accounts = map(lambda x: x.toDict(), accounts)
    accounts = list(accounts)
    return jsonify(accounts)

@app.route('/items')

def items():
    id = request.args.get("id")
    name = request.args.get("name")
    min = request.args.get("min")
    max = request.args.get("max")
    continent = request.args.get("continent")
    classification = request.args.get("class")
    onlyinstock = request.args.get("in_stock")

    items = ItemModel.get_all_items()

    if id != None:
        items = filter(lambda x: x.hasId(id), items)

    if name != None:
        items = filter(lambda x: x.hasName(name), items)

    #hasDescription as filter to be added?

    if min != None and max != None:
        items = filter(lambda x: x.inPriceRange(float(min),float(max)), items)
     
    if continent != None:
        items = filter(lambda x: x.hasContinent(continent), items)

    if onlyinstock != None:
        items = filter(lambda x: x.inStock(onlyinstock), items)

    if classification != None:
        items = filter(lambda x: x.hasClassification(classification), items)

    items = map(lambda x: x.toDict(), items)
    items = list(items)
    return jsonify(items)

if __name__ == '__main__':
    app.run(threaded=True)
