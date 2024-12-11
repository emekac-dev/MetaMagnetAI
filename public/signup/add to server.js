

// Serve signup page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Handle signup form submission
app.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Mock user creation logic
  if (password !== confirmPassword) {
    res.send('Passwords do not match. Please try again.');
  } else {
    // Save user data (this is where you integrate a database)
    console.log('User signed up:', { name, email });
    res.redirect('/login');
  }
});
