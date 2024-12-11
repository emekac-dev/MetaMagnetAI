const path = require("path");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const viewRouter = require("./routes/viewRoutes");
const errorController = require("./controllers/errorController");
const researchRouter = require("./routes/researchRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");

const app = express();
let recentActivities = [];
let insights = "No data yet.";

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use("/", viewRouter); //For all the future views
app.use("/api/research", researchRouter);
app.use("/api/dashboard", dashboardRouter);

// Serve login page
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Mock user authentication
  if (email === "test@example.com" && password === "password123") {
    res.redirect("/dashboard");
  } else {
    res.send("Invalid email or password. Please try again.");
  }
});

// File upload configuration
const upload = multer({ dest: "uploads/" });

// Meta-analysis endpoint
app.post("/meta-analysis", upload.single("fileUpload"), (req, res) => {
  const { searchTopics, studyTypes, timeSpan, journals } = req.body;
  const file = req.file;

  console.log("Received Parameters:", {
    searchTopics,
    studyTypes,
    timeSpan,
    journals,
  });

  // Mock analysis process
  const result = {
    graph:
      "<p><strong>Graphical Output:</strong> [Placeholder for Forest Plot]</p>",
    summary:
      "<p><strong>Summary:</strong> Analysis shows significant findings in the given dataset and parameters.</p>",
  };

  setTimeout(() => res.json(result), 3000); // Simulate processing time
});

// Export report endpoint
app.get("/export-report", (req, res) => {
  res.download("./sample-report.pdf", "MetaAnalysisReport.pdf");
});

// Routes
app.get("/api/recent-activities", (req, res) => {
  res.json(recentActivities);
});

app.get("/api/insights", (req, res) => {
  res.json({ insights });
});

app.post("/api/search", (req, res) => {
  const { topic, year, field, region } = req.body;
  const activity = `Search: ${topic} (${field}, ${year}, ${region})`;
  recentActivities.push(activity);
  res.json({ message: "Search logged", activity });
});

app.post("/api/meta-analysis", (req, res) => {
  const { data } = req.body;
  insights = `Generated insights based on the data provided: ${data}`;
  res.json({ message: "Meta-analysis completed", insights });
});

// Handle app errors
app.use(errorController);

// exports app
module.exports = app;
