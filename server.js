const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let recentActivities = [];
let insights = "No data yet.";

  // Mock data for demonstration
  const userData = {
    name: "John Doe",
    topicsCount: 12,
    reportsCount: 5,
    trendsCount: 8,
    activities: [
      "Generated a meta-analysis report on Climate Change.",
      "Explored trends in AI-based teaching methods.",
      "Analyzed literature on Sustainable Development Goals."
    ]
  };



// Middleware
app.use(express.static('public')); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.get('/api/dashboard', (req, res) => {
  res.json({
    name: userData.name,
    topicsCount: userData.topicsCount,
    reportsCount: userData.reportsCount,
    trendsCount: userData.trendsCount,
    activities: userData.activities
  });
});


// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Mock user authentication
  if (email === 'test@example.com' && password === 'password123') {
    res.redirect('/public/dashboard');
  } else {
    res.send('Invalid email or password. Please try again.');
  }
});


  // File upload configuration
const upload = multer({ dest: 'uploads/' });

// Meta-analysis endpoint
app.post('/meta-analysis', upload.single('fileUpload'), (req, res) => {
  const { searchTopics, studyTypes, timeSpan, journals } = req.body;
  const file = req.file;

  console.log('Received Parameters:', { searchTopics, studyTypes, timeSpan, journals });

  // Mock analysis process
  const result = {
    graph: '<p><strong>Graphical Output:</strong> [Placeholder for Forest Plot]</p>',
    summary: '<p><strong>Summary:</strong> Analysis shows significant findings in the given dataset and parameters.</p>',
  };

  setTimeout(() => res.json(result), 3000); // Simulate processing time
});

// Export report endpoint
app.get('/export-report', (req, res) => {
  res.download('./sample-report.pdf', 'MetaAnalysisReport.pdf');
});


// Routes
app.get('/api/recent-activities', (req, res) => {
  res.json(recentActivities);
});

app.get('/api/insights', (req, res) => {
  res.json({ insights });
});

app.post('/api/search', (req, res) => {
  const { topic, year, field, region } = req.body;
  const activity = `Search: ${topic} (${field}, ${year}, ${region})`;
  recentActivities.push(activity);
  res.json({ message: 'Search logged', activity });
});

app.post('/api/meta-analysis', (req, res) => {
  const { data } = req.body;
  insights = `Generated insights based on the data provided: ${data}`;
  res.json({ message: 'Meta-analysis completed', insights });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
