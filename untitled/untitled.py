from flask import Flask, request,jsonify
from ItemModel import *

app = Flask(__name__)

@app.route('/items')

def items(name = None, classification=None):
    name = request.args.get("name")
    min = request.args.get("min")
    max = request.args.get("max")
    classification = request.args.get("class")
    items = ItemModel.get_all_items()
    if(name != None):
        return jsonify(ItemModel.filter_item_name(str(name)))
    if(classification != None):
        return jsonify(ItemModel.filter_item_classifiction(str(classification)))
    if(min and max):
        return jsonify(ItemModel.filter_item_price(float(min),float(max)))
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)
