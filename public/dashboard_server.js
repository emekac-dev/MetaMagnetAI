const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Simulated database for recent activities
let recentActivities = [];

app.post('/api/search', (req, res) => {
  const { topic, year, field, region } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required." });
  }

  const activity = `Search: "${topic}" | Year: ${year || "Any"} | Field: ${field || "Any"} | Region: ${region || "Any"}`;
  recentActivities.push(activity);

  res.json({ activity });
});

// Endpoint to fetch recent activities (optional, for initialization)
app.get('/api/recent-activities', (req, res) => {
  res.json(recentActivities);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
