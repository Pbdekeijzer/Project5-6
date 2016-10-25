from flask import Flask, request,jsonify
from ItemModel import *


app = Flask(__name__)


@app.route('/items')

def items():
    name = request.args.get("name")
    if(name):
        return ItemModel.filter_item_name(str(name))
    return jsonify(ItemModel.get_all_items())

if __name__ == '__main__':
    app.run(debug=True)
