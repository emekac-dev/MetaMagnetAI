const signUp = async (e) => {
  e.preventDefault(); // Prevent form submission

  // Get the form element
  const form = e.target;

  // Extract input fields
  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const fieldOfStudy = form.querySelector("#field_of_study").value.trim();
  const password = form.querySelector("#password").value.trim();
  const passwordConfirm = form.querySelector("#confirm-password").value.trim();

  // Check for empty fields
  if (!name) {
    showErrorMessageWithTimeout("error-message", "Full Name is required.");
    return;
  }
  if (!email) {
    showErrorMessageWithTimeout("error-message", "Email is required.");
    return;
  }
  if (!fieldOfStudy) {
    showErrorMessageWithTimeout("error-message", "Field of Study is required.");
    return;
  }
  if (!password) {
    showErrorMessageWithTimeout("error-message", "Password is required.");
    return;
  }
  if (!passwordConfirm) {
    showErrorMessageWithTimeout(
      "error-message",
      "Confirm Password is required."
    );
    return;
  }

  // Check if passwords match
  if (password !== passwordConfirm) {
    showErrorMessageWithTimeout("error-message", "Passwords do not match.");
    return;
  }
  try {
    const res = await axios.post("/api/auth/signup", {
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email,
      fieldOfStudy,
      password,
      passwordConfirm,
    });

    window.location.href = "/dashboard";
  } catch (error) {
    showErrorMessageWithTimeout("error-message", extractErrorMessage(error), 5);
  }
};
