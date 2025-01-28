import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "./router";
import { FooterManager } from "./components/footer"; // Import FooterManager

const loadFooter = () => {
  fetch("/src/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerElement = document.getElementById("footer");
      if (footerElement) {
        footerElement.innerHTML = data;
        new FooterManager(); // Initialize FooterManager after loading the footer
      }
    })
    .catch((error) => console.error("Error loading footer:", error));
};

const initApp = () => {
  // Load the header dynamically
  loadHeader();

  // Load the footer dynamically
  loadFooter();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);
};

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});