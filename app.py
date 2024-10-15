from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
from sklearn.datasets import load_iris
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

# Load the trained model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load Iris dataset
iris = load_iris()

# Serve the front-end HTML page
@app.route('/')
def home():
    return render_template('index.html')

# API route to get a prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']  # Get data from the request
    prediction = model.predict([data])[0]  # Perform prediction
    probabilities = model.predict_proba([data])[0]  # Get prediction probabilities

    # Map class index to flower name
    flower_name = iris.target_names[prediction]
    probability = max(probabilities)  # Get the highest probability

    return jsonify({
        'prediction': flower_name,
        'probability': round(probability * 100, 2),  # Convert to percentage
        'data': data
    })

# API route to get the Iris dataset for plotting
@app.route('/get_data', methods=['GET'])
def get_data():
    data = {
        'features': iris.data.tolist(),
        'target': iris.target.tolist(),
        'feature_names': iris.feature_names,
        'target_names': iris.target_names.tolist()
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
