import json
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib

# Load your training data
with open("training_data.json", "r") as f:
    data = json.load(f)

# Convert to DataFrame
df = pd.DataFrame(data)

# Preprocess categorical → numerical
df['category'] = df['category'].astype('category').cat.codes
df['priceSensitivity'] = df['priceSensitivity'].map({'low': 0, 'medium': 1, 'high': 2})
df['lovesCategory'] = df['lovesCategory'].astype(int)

# Features & target
X = df[['price', 'category', 'priceSensitivity', 'lovesCategory', 'tagCount']]
y = df['regretScore']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
print(f"✅ Trained model! MAE: {mae:.2f}")

# Save model
joblib.dump(model, "regret_model.pkl")
print("💾 Saved as regret_model.pkl")
