document.getElementById('meta-analysis-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    // Show progress
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = '10%';
  
    // Send form data to backend
    const response = await fetch('/meta-analysis', {
      method: 'POST',
      body: formData
    });
  
    // Process response
    if (response.ok) {
      progressBar.style.width = '100%';
  
      const result = await response.json();
      document.getElementById('graphical-output').innerHTML = result.graph;
      document.getElementById('text-summary').innerHTML = result.summary;
    } else {
      alert('Error performing analysis. Please try again.');
    }
  });
  
  // Export report functionality
  document.getElementById('export-report').addEventListener('click', () => {
    window.location.href = '/export-report';
  });
  