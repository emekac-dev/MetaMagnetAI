document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch data using Axios
    const response = await axios.get("/api/dashboard");
    const data = response.data;

    // Populate dashboard elements if they exist
    if (document.querySelector("#user-name")) {
      document.getElementById("user-name").innerText = data.name;
    }
    if (document.getElementById("topics-count")) {
      document.getElementById("topics-count").innerText = data.topicsCount;
    }
    if (document.getElementById("reports-count")) {
      document.getElementById("reports-count").innerText = data.reportsCount;
    }
    if (document.getElementById("trends-count")) {
      document.getElementById("trends-count").innerText = data.trendsCount;
    }

    // Populate recent activities
    const activityLog = document.getElementById("activity-log");
    if (activityLog && Array.isArray(data.activities)) {
      data.activities.forEach((activity) => {
        const listItem = document.createElement("li");
        listItem.innerText = activity;
        activityLog.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Show an error message to the user
    showErrorMessageWithTimeout(
      "error-message",
      "Failed to load dashboard data. Please try again later.",
      5000
    );
  }
});

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
    const res = await axios.post("/api/research/search", data);
  } catch (error) {
    showErrorMessageWithTimeout("error-message", extractErrorMessage(error), 5);
  }
};
