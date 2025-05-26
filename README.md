# impulsepurchaseai
Tell you how likely you will regret YOUR impulse purchase

# 🛒 ImpulseTracker — Regret Web App

**"Are you gonna regret this impulse buy?"**

ImpulseTracker is a full-stack web app that predicts how much you might regret a potential purchase — using behavior data and a trained machine learning model.

---

## 🎯 What It Does

- Takes user input (price, category, tags, etc.)
- Sends that input to a backend server
- The backend forwards the data to a Python Flask ML API
- A trained model returns a "regret score" (0–100) (trained it myself based on Amazon customer reviews)
- The UI displays a dynamic warning or encouragement based on that score

---

## 🛠 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | HTML, CSS, JavaScript            |
| Backend     | Node.js + Express                |
| ML API      | Python + Flask + scikit-learn    |
| ML Model    | RandomForestRegressor            |
| Dataset     | Custom labeled behavioral data   |

---

## 📁 File Structure

regret-web-app/
├── public/ # Frontend files
│ ├── index.html
│ └── script.js
├── backend/ # Node.js server
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
├── ml-api/ # Python ML API
│ ├── serve_model.py
│ ├── regret_model.pkl
│ └── requirements.txt
├── train/ # ML training logic + dataset
│ ├── train_model.py
│ └── training_data.json
├── start-servers.bat # (Optional) Windows script to launch both servers
└── README.md

yaml
Copy
Edit

---

## 🚀 How to Run the App Locally

### 1. 🧠 ML API (Python)
```bash
cd ml-api
pip install -r requirements.txt
python serve_model.py
2. 🔁 Backend Server (Node.js)
bash
Copy
Edit
cd backend
npm install
node server.js
3. 🌐 Open the App
Open public/index.html in your browser (just double-click it or right-click → open in browser).

💡 Optional: Use start-servers.bat (Windows only)
If you're on Windows and want to launch both the backend and ML API servers at once, you can double-click start-servers.bat. This will open two terminal windows — one for the Node backend and one for the Python API.

⚠️ Make sure:

You have both Node and Python installed

Your terminals are configured to run npm and python from any location

🧪 Example Output
🤖 Regret Score: 83.7
🚨 HOLD UP! This screams impulse buy energy.

Regret Score: 12.3
🟢 Chill — this doesn’t feel impulsive at all.

📊 Future Ideas
User session history

Cloud deployment (Render, Fly.io, etc.)

Improved model training with user feedback

Mobile UI

📬 Contact
Made by Zach Arredondo-Robertson
Feel free to fork or reach out!
