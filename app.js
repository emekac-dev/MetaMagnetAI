const path = require("path");
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const viewRouter = require("./routes/viewRoutes");
const errorController = require("./controllers/errorController");
const researchRouter = require("./routes/researchRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();
let recentActivities = [];
let insights = "No data yet.";

// Middleware
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

//cookie parser
app.use(cookieParser());

// data sanitization against no-sql query injection
app.use(mongoSanitize());

// data sanitization against xss
app.use(xss());

//preventing parameter pollution
app.use(hpp({ whitelist: [] }));

app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use("/", viewRouter); //For all the future views
app.use("/api/research", researchRouter);
app.use("/api/dashboard", userRouter);
app.use("/api/auth", authRouter);

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
