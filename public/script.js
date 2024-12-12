/**
 * Shows an error message temporarily.
 * @param {string} elementId - The ID of the error message element.
 * @param {string} message - The error message to display.
 * @param {number} timeout - Time in milliseconds before the error message is hidden.
 */

function showErrorMessageWithTimeout(elementId, message, timeout = 5) {
  const errorElement = document.getElementById(elementId);

  let className =
    "absolute bottom-[50px] min-h-[50px] right-[30px] hidden w-[200px] max-w-[100vw] text-white rounded bg-red-400 text-meduim p-5";

  if (errorElement) {
    // Show the error message
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.className =
      className + " animate__animated animate__slideInRight";

    // Hide the error message after the specified timeout
    setTimeout(() => {
      errorElement.className =
        className + " animate__animated animate__slideOutRight";
      errorElement.innerText = ""; // Clear the message
    }, timeout * 1000);
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}

/**
 * Extracts a user-friendly error message from an error object.
 * @param {object|string} error - The error object or string to extract the message from.
 * @returns {string} - A user-friendly error message.
 */
function extractErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message; // Message from server response
  } else if (error?.message) {
    return error.message; // General error message
  } else if (typeof error === "string") {
    return error; // Error is a string
  } else {
    return "An unknown error occurred. Please try again."; // Default fallback message
  }
}

const findResearchTopics = async (e) => {
  e.preventDefault();
  const form = e.target;

  // Extract values from input fields using their names or IDs
  const searchBar = form.querySelector("#search-bar");
  const yearFilter = form.querySelector("#year-filter");
  const fieldFilter = form.querySelector("#field-filter");
  const regionFilter = form.querySelector("#region-filter");

  // Prepare data
  const data = {
    topic: searchBar.value,
    year: yearFilter.value,
    field: fieldFilter.value,
    region: regionFilter.value,
  };

  try {
    if (!searchBar.value || !searchBar.value.trim()) {
      throw "Topic is required";
    }
    if (data.year.trim() && !data.year.match(/^\d{4}-\d{4}$/)) {
      throw "Year format must be YYYY-YYYY.";
    }
    const res = await axios.post("/api/research/search", data);
    localStorage.setItem("researchData", JSON.stringify(res.data));
    location.href = `/research?t=${encodeURIComponent(
      searchBar.value
    )}&y=${encodeURIComponent(yearFilter.value)}&f=${encodeURIComponent(
      fieldFilter.value
    )}&r=${encodeURIComponent(regionFilter.value)}`;
  } catch (error) {
    showErrorMessageWithTimeout("error-message", extractErrorMessage(error), 5);
  }
};

const findResearchTopicsWithoutForm = async () => {
  // Extract values from input fields using their names or IDs
  const searchBar = document.querySelector("#search-bar");
  const yearFilter = document.querySelector("#year-filter");
  const fieldFilter = document.querySelector("#field-filter");
  const regionFilter = document.querySelector("#region-filter");

  // Prepare data
  const data = {
    topic: searchBar.value,
    year: yearFilter.value,
    field: fieldFilter.value,
    region: regionFilter.value,
  };

  try {
    if (!searchBar.value || !searchBar.value.trim()) {
      throw "Topic is required";
    }
    if (data.year.trim() && !data.year.match(/^\d{4}-\d{4}$/)) {
      throw "Year format must be YYYY-YYYY.";
    }
    const res = await axios.post("/api/research/search", data);
    localStorage.setItem("researchData", JSON.stringify(res.data));
    location.href = `/research?t=${encodeURIComponent(
      searchBar.value
    )}&y=${encodeURIComponent(yearFilter.value)}&f=${encodeURIComponent(
      fieldFilter.value
    )}&r=${encodeURIComponent(regionFilter.value)}`;
    return res.data;
  } catch (error) {
    showErrorMessageWithTimeout("error-message", extractErrorMessage(error), 5);
  }
};
