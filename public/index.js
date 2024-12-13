window.onload = async function () {
  try {
    // Make an API call to check if the user is logged in
    const response = await fetch("/api/auth/check-auth", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    // Process the response
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // Update the button text if the user is logged in
      if (data.loggedIn) {
        let button = document.getElementById("login-btn");
        if (button) {
          button.textContent = "Go to Dashboard";
        }
      }
    } else {
      console.error("Failed to verify login status", response.statusText);
    }
  } catch (error) {
    console.error("Error checking login status:", error);
  }
};
