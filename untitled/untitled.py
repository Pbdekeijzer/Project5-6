from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from ItemModel import *

app = Flask(__name__)
CORS(app)

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/items')

def items():

    name = request.args.get("name")
    min = request.args.get("min")
    max = request.args.get("max")
    classification = request.args.get("class")

    items = ItemModel.get_all_items()

    if classification != None:
        items = ItemModel.filter_item_classifiction(str(classification), items)

    if name != None:
        items = ItemModel.filter_item_name(str(name), items)

    if min != None and max != None:
        items = ItemModel.filter_item_price(float(min),float(max), items)

    return jsonify(items)

if __name__ == '__main__':
    app.run(threaded=True)
