const login = async (e) => {
  e.preventDefault(); // Prevent form submission

  // Get the form element
  const form = e.target;

  // Extract input fields
  const email = form.querySelector("#email").value.trim();
  const password = form.querySelector("#password").value.trim();

  // Check for empty fields
  if (!email) {
    showErrorMessageWithTimeout("error-message", "Email is required.");
    return;
  }
  if (!password) {
    showErrorMessageWithTimeout("error-message", "Password is required.");
    return;
  }

  try {
    // Send login request
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    // Redirect to dashboard on successful login
    window.location.href = "/dashboard";
  } catch (error) {
    // Handle login errors
    showErrorMessageWithTimeout("error-message", extractErrorMessage(error), 5);
  }
};
