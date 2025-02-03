import { setupNavigation } from "../../features/router";

export function loadHeader() {
  fetch("/src/components/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch header: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const headerElement = document.getElementById("header");
      if (headerElement) {
        headerElement.innerHTML = data;
        setupNavigation(); // Attach navigation listeners after loading the header
      } else {
        console.error("Header element not found");
      }
    })
    .catch((error) => console.error("Error loading header:", error));
}
