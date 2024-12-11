// dashboard.js

document.getElementById("search-button").addEventListener("click", () => {
  const topic = document.getElementById("search-bar").value.trim();
  const year = document.getElementById("year-filter").value.trim();
  const field = document.getElementById("field-filter").value.trim();
  const region = document.getElementById("region-filter").value.trim();

  if (!topic) {
    alert("Please enter a research topic or keyword.");
    return;
  }

  const searchParams = {
    topic,
    year,
    field,
    region,
  };

  // Send search parameters to the backend
  fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchParams),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.activity) {
        alert("Search logged successfully.");
        updateRecentActivities(data.activity);
      } else {
        alert("Search failed. Please try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
});

// Update recent activities dynamically
function updateRecentActivities(activity) {
  const activityLog = document.getElementById("activity-log");
  const newActivity = document.createElement("li");
  newActivity.textContent = activity;
  activityLog.appendChild(newActivity);
}
