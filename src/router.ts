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
    const path = routes[url as keyof typeof routes] || "404.html";
    fetch(`/src/pages/${path}`)
      .then((response) => response.text())
      .then((data) => {
        const appElement = document.getElementById("app");
        if (appElement) {
          appElement.innerHTML = data;
        } else {
          console.error("App element not found");
        }
      })
      .catch((error) => console.error("Error loading content:", error));
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
  
  window.addEventListener("popstate", () => {
    loadContent(window.location.pathname);
  });