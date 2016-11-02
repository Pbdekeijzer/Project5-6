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

@app.route('/register')

def register():
    return render_template('register.html')

@app.route('/accounts')

def accounts():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')

    shit = AccountModel.getAllUsers()
    shit = map(lambda x: x.toDict(), shit)
    shit = list(shit)
    return jsonify(shit)

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
    app.run(debug=True)
