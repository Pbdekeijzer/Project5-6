from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from ItemModel import *

app = Flask(__name__)
CORS(app)

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/products/<id>')

def productsdetail(id):
    return render_template('products.html')

@app.route('/items')

def items():
    id = request.args.get("id")
    name = request.args.get("name")
    min = request.args.get("min")
    max = request.args.get("max")
    continent = request.args.get("continent")
    classification = request.args.get("class")

    items = ItemModel.get_all_items()

    if classification != None:
        items = filter(lambda x: x.hasClassification(classification), items)

    if id != None:
        items = filter(lambda x: x.hasId(id), items)
     
    if continent != None:
        items = filter(lambda x: x.hasContinent(continent), items)

    if name != None:
        items = filter(lambda x: x.hasName(name), items)

    if min != None and max != None:
        items = filter(lambda x: x.inPriceRange(float(min),float(max)), items)

    items = map(lambda x: x.toDict(), items)
    return jsonify(items)

if __name__ == '__main__':
    app.run(threaded=True)
