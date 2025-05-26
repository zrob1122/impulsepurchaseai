// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple route to test
// app.get('/', (req, res) => {
//   res.send('🛒 Regret Web App backend is running!');
// });

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.post("/cart", async (req, res) => {
  try {
    const response = await fetch("http://localhost:5001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("🧠 ML Regret Score:", data.regretScore);

    res.status(200).json({
      message: "Item received!",
      regretScore: data.regretScore,
    });
  } catch (err) {
    console.error("❌ ML call failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
