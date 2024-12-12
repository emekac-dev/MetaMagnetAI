document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Select the form and its fields
    const form = document.querySelector(".search-bar-section"); // Ensure the form is selected
    const searchBar = form.querySelector("#search-bar");
    const yearFilter = form.querySelector("#year-filter");
    const fieldFilter = form.querySelector("#field-filter");
    const regionFilter = form.querySelector("#region-filter");

    // Extract parameters from URL
    const params = new URLSearchParams(window.location.search);

    const topic = params.get("t"); // e.g., "AI"
    const year = params.get("y"); // e.g., "2015-2023"
    const field = params.get("f"); // e.g., "Biology"
    const region = params.get("r"); // e.g., "Africa"

    // Set the values of the input fields
    if (topic) searchBar.value = topic;
    if (year) yearFilter.value = year;
    if (field) fieldFilter.value = field;
    if (region) regionFilter.value = region;

    let storedData = JSON.parse(localStorage.getItem("researchData"));

    if (!storedData || storedData.search_parameters.q !== topic) {
      storedData = await findResearchTopicsWithoutForm();
    }
    const resultsContainer = document.getElementById("results-container");
    const paginationContainer = document.getElementById("pagination");

    function renderResults(results) {
      resultsContainer.innerHTML = results
        .map(
          (result) => `
            <div class="bg-white p-4 rounded shadow  hover:scale-[1.01]">
            <a href="${result.link}" target="_blank" class="">
              <h2 class="text-lg font-bold text-blue-600 hover:underline">
                  ${result.title}
                  </h2>
                  <p class="text-gray-700">${result.snippet}</p>
                  <p class="text-sm text-gray-500 mt-2">${result.publication_info.summary}</p>
                  <p class="text-sm text-gray-500 mt-2">
                  <strong>Cited By:</strong> ${result.inline_links.cited_by.total}
                  </p>
                  </a>
            </div>
          `
        )
        .join("");
    }

    function renderPagination(pagination) {
      paginationContainer.innerHTML = "";

      // Previous Button
      if (pagination.current > 1) {
        const prevPage = pagination.current - 1;
        paginationContainer.innerHTML += `
              <button class="px-4 py-2 bg-blue-500 text-white rounded" data-page="${prevPage}">
                Previous
              </button>`;
      }

      // Page Links
      Object.keys(pagination.other_pages).forEach((pageNumber) => {
        paginationContainer.innerHTML += `
              <button class="px-4 py-2 ${
                Number(pageNumber) === pagination.current
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              } rounded" data-page="${pageNumber}">
                ${pageNumber}
              </button>`;
      });

      // Next Button
      if (pagination.next) {
        const nextPage = pagination.current + 1;
        paginationContainer.innerHTML += `
              <button class="px-4 py-2 bg-blue-500 text-white rounded" data-page="${nextPage}">
                Next
              </button>`;
      }
    }

    function handlePageChange(event) {
      const button = event.target.closest("button");
      if (button && button.dataset.page) {
        const page = Number(button.dataset.page);
        console.log(`Load page ${page}`); // Replace with actual API call logic
        storedData.pagination.current = page; // Update current page for mock data
        renderPagination(storedData.pagination);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    // Render initial results and pagination
    renderResults(storedData.organic_results);
    renderPagination(storedData.pagination);

    // Add pagination click listener
    paginationContainer.addEventListener("click", handlePageChange);
  } catch (error) {
    console.error("Error initializing form values:", error);
  }
});