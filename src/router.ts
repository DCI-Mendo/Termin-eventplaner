import { initContactPage } from "./pages/contact";
import { openPopup, closePopup } from "./components/popup";
import { EventRenderer } from "./pages/eventsBooking"; // Import EventRenderer
import { initAboutPage } from "./pages/about"; // Import initAboutPage

const routes: { [key: string]: string } = {
  "/": "home.html",
  "/calendar": "calendar.html",
  "/services": "eventsBooking.html",
  "/about": "about.html",
  "/contact": "contact.html",
};

export function navigateTo(url: string) {
  history.pushState(null, "", url);
  loadContent(url);
}

function loadContent(url: string) {
  const path = routes[url] || "404.html";
  fetch(`/src/pages/${path}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const appElement = document.getElementById("app");
      if (appElement) {
        appElement.innerHTML = data;

        // Reinitialize page-specific scripts
        initializePageLogic();
      } else {
        console.error("App element not found");
      }
    })
    .catch((error) => console.error("Error loading content:", error));
}

export function initializePageLogic() {
  const currentPage = window.location.pathname;

  if (currentPage === "/contact") {
    // Initialize contact form logic
    initContactPage();
  } else if (currentPage === "/calendar") {
    // Initialize calendar logic
    document
      .getElementById("addEventButton")
      ?.addEventListener("click", openPopup);
    document
      .getElementById("cancelButton")
      ?.addEventListener("click", closePopup);
  } else if (currentPage === "/services") {
    // Initialize events booking logic
    const eventRenderer = new EventRenderer();
    eventRenderer.initializeEvents();
  } else if (currentPage === "/about") {
    // Initialize About Us page logic
    initAboutPage();
  }
  // Add more conditions for other pages as needed
}

export function setupNavigation() {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = link.getAttribute("href");
      if (url) {
        navigateTo(url);
      }
    });
  });
}

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  loadContent(window.location.pathname);
});
