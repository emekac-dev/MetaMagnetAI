// Simulated database for recent activities
let recentActivities = [];

// Endpoint to fetch recent activities (optional, for initialization)
app.get("/api/recent-activities", (req, res) => {
  res.json(recentActivities);
});
