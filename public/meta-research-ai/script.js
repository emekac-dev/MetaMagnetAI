document.getElementById("suggest-button").addEventListener("click", () => {
  const discipline = document.getElementById("discipline-select").value;

  if (!discipline) {
    alert("Please select a discipline.");
    return;
  }

  fetch(
    `/api/research/suggestions?discipline=${encodeURIComponent(discipline)}`
  )
    .then((response) => response.json())
    .then((data) => {
      const topicList = document.getElementById("topic-list");
      topicList.innerHTML = ""; // Clear previous results

      if (data.topics && data.topics.length > 0) {
        data.topics.forEach((topic) => {
          const li = document.createElement("li");

          // Convert Markdown to HTML
          const htmlContent = marked.parse(topic);

          // Insert parsed HTML into list item
          li.innerHTML = htmlContent;
          topicList.appendChild(li);

          // Add event listener for click
          li.addEventListener("click", (ev) => {
            ev.preventDefault();
            location.href = `/research?t=${encodeURIComponent(
              markdownToPlainText(topic)
            )}`;
          });
        });
      } else {
        topicList.innerHTML =
          "<li>No topics found. Try a different discipline.</li>";
      }
    })
    .catch((error) => {
      console.error("Error fetching suggestions:", error);
      showErrorMessageWithTimeout(
        "error-message",
        extractErrorMessage(error),
        5
      );
    });
});
