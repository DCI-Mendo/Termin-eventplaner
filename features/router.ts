import { routes } from "./routes";
import { initContactPage } from "../src/pages/contact";
import { closePopup, openPopup } from "../src/components/popup"; // Import openPopup
import { EventRenderer } from "../src/pages/eventBooking";

import notFoundPage from "../src/pages/notFound";
import { renderTeam } from "../src/pages/about"; // Importiere renderTeam

export function navigateTo(url: string) {
  history.pushState(null, "", url);
  loadContent(url);
}

function loadContent(url: string) {
  const route = routes.find((r) =>
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
    .catch((error) => {
      console.error("Error loading content:", error);
      const appElement = document.getElementById("app");
      if (appElement) {
        appElement.innerHTML = notFoundPage();
      }
    });
}

export function initializePageLogic() {
  const currentPage = window.location.pathname;
  console.log(`Current page: ${currentPage}`);

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
  } else if (currentPage.startsWith("/services")) {
    // Initialize events booking logic
    console.log("Initializing EventRenderer for eventsBooking page");
    const eventRenderer = new EventRenderer();
    const pathParts = currentPage.split("/");
    if (pathParts.length === 3) {
      const eventId = pathParts[2];
      eventRenderer.renderEventDetails(eventId);
    } else {
      eventRenderer.initializeEvents();
    }
  } else if (currentPage.startsWith("/about")) {
    // Initialize about page logic
    renderTeam(); // Rufe renderTeam auf, um die Teamkarten zu rendern
  }
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
