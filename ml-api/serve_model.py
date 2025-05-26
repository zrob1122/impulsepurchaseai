from flask import Flask, request, jsonify
import joblib
import numpy as np

# Load the trained model
model = joblib.load("regret_model.pkl")

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        # Extract and process fields
        price = data["price"]
        category = data["category"]
        priceSensitivity = data["priceSensitivity"]
        lovesCategory = data["lovesCategory"]
        tagCount = data["tagCount"]

        # Categorical encoding
        category_codes = {
            "tech": 0,
            "fitness": 1,
            "clothing": 2,
            "beauty": 3,
            "food": 4
        }
        price_map = {"low": 0, "medium": 1, "high": 2}

        features = np.array([[ 
            price,
            category_codes.get(category, 0),
            price_map.get(priceSensitivity, 1),
            int(lovesCategory),
            tagCount
        ]])

        # Predict using the model
        prediction = model.predict(features)[0]

        return jsonify({"regretScore": round(prediction, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5001)
