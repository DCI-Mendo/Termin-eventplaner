import { routes } from "./routes";
import { initContactPage } from "../src/pages/contact";
import { openPopup, closePopup } from "../src/components/popup";
import { EventRenderer } from "../src/pages/eventBooking";

export function navigateTo(url: string) {
  history.pushState(null, "", url);
  loadContent(url);
}

function loadContent(url: string) {
  const route = routes.find((r: { path: string; page: string }) =>
    new RegExp(`^${r.path.replace(/:\w+/g, "\\w+")}$`).test(url),
  );
  const path = route ? route.page : "404.html"; // Handle dynamic routes
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

// ...existing code...

export function initializePageLogic() {
  const currentPage = window.location.pathname;

  if (currentPage.startsWith("/contact")) {
    // Initialize contact form logic
    initContactPage();
  } else if (currentPage.startsWith("/calendar")) {
    // Initialize calendar logic
    document
      .getElementById("addEventButton")
      ?.addEventListener("click", openPopup);
    document
      .getElementById("cancelButton")
      ?.addEventListener("click", closePopup);
  } else if (currentPage.startsWith("/eventsBooking")) {
    // Initialize events booking logic
    const eventRenderer = new EventRenderer();
    eventRenderer.initializeEvents();
  } else if (currentPage.startsWith("/events/")) {
    // Initialize event details logic
    const eventId = currentPage.split("/")[2];
    const eventRenderer = new EventRenderer();
    eventRenderer.renderEventDetails(eventId);
  }
  // Add more conditions for other pages as needed
}

// ...existing code...

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
