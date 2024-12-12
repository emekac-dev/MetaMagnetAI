const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve static files from "public" directory

// Mock AI-based topic generator
function generateTopics(discipline) {
  const topics = {
    AI: ["Deep Learning Applications in Healthcare", "Ethics of AI in Autonomous Vehicles", "Natural Language Processing Trends"],
    Biology: ["CRISPR Technology in Gene Editing", "Impact of Climate Change on Marine Life", "Human Microbiome Studies"],
    Education: ["Technology in Early Childhood Education", "Inclusive Education Practices", "Impact of COVID-19 on Learning Outcomes"],
    Climate: ["Renewable Energy Adoption", "Urban Heat Islands", "Climate Policy and Economic Impacts"],
  };

  return topics[discipline] || [];
}

// API endpoint for topic suggestions
app.get("/api/suggestions", (req, res) => {
  const { discipline } = req.query;

  if (!discipline) {
    return res.status(400).json({ error: "Discipline is required." });
  }

  const suggestions = generateTopics(discipline);
  res.json({ topics: suggestions });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
