document.getElementById("suggest-button").addEventListener("click", () => {
  const discipline = document.getElementById("discipline-select").value;

  if (!discipline) {
    alert("Please select a discipline.");
    return;
  }

  fetch(`/api/suggestions?discipline=${encodeURIComponent(discipline)}`)
    .then((response) => response.json())
    .then((data) => {
      const topicList = document.getElementById("topic-list");
      topicList.innerHTML = ""; // Clear previous results

      if (data.topics && data.topics.length > 0) {
        data.topics.forEach((topic) => {
          const li = document.createElement("li");
          li.textContent = topic;
          topicList.appendChild(li);
        });
      } else {
        topicList.innerHTML = "<li>No topics found. Try a different discipline.</li>";
      }
    })
    .catch((error) => {
      console.error("Error fetching suggestions:", error);
      alert("Something went wrong. Please try again later.");
    });
});
