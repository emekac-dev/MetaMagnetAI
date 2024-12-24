document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch data using Axios
    const response = await axios.get("/api/dashboard");
    const data = response.data.data;

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
    activityLog.innerHTML = "";
    if (activityLog && Array.isArray(data.activities)) {
      data.activities.forEach((activity) => {
        const listItem = document.createElement("li");
        listItem.className = "cursor-pointer";
        listItem.innerText = activity;
        activityLog.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Show an error message to the user
    showErrorMessageWithTimeout(
      "error-message",
      extractErrorMessage(error),
      5000
    );
  }
});
