document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/dashboard')
      .then(response => response.json())
      .then(data => {
        // Populate dashboard with data
        document.getElementById('user-name').innerText = data.name;
        document.getElementById('topics-count').innerText = data.topicsCount;
        document.getElementById('reports-count').innerText = data.reportsCount;
        document.getElementById('trends-count').innerText = data.trendsCount;
  
        // Populate recent activities
        const activityLog = document.getElementById('activity-log');
        data.activities.forEach(activity => {
          const listItem = document.createElement('li');
          listItem.innerText = activity;
          activityLog.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching dashboard data:', error));
  });
  