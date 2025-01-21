export function loadHeader() {
    fetch('/src/components/header.html')
      .then(response => response.text())
      .then(data => {
        const headerElement = document.getElementById('header');
        if (headerElement) {
          headerElement.innerHTML = data;
        } else {
          console.error('Header element not found');
        }
        // Add any additional JavaScript functionality for the header here
      })
      .catch(error => console.error('Error loading header:', error));
  }