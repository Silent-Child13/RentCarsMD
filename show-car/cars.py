import os
from flask import Flask, jsonify, abort
from databaseCars import load_cars, load_car_by_id
from flask_cors import CORS

base_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app, resources={r"/rentdescription/*": {"origins": "http://127.0.0.1:5500"}})

@app.route('/rentdescription/', methods=['GET'])
def get_cars():
    cars = load_cars()
    return jsonify(cars)

@app.route('/rentdescription/<int:car_id>/', methods=['GET'])
def get_car_by_id(car_id):
    car = load_car_by_id(car_id)
    if car is None:
        abort(404)
    return jsonify(car)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
