import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "../features/router";
import { closePopup } from "./components/popup";
import { FooterManager } from "./components/footer"; // Import FooterManager


const initApp = () => {
  loadHeader();

  // Load the footer dynamically
  loadFooter();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);

  fetch("/src/components/popup.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      document
        .getElementById("cancelButton")
        ?.addEventListener("click", closePopup);
    });
};
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


initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});