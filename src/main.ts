import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "../features/router";
import { closePopup } from "./components/popup";

const initApp = () => {
  // Load the header dynamically
  loadHeader();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);

  // Load the popup dynamically
  fetch("/src/components/popup.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      document
        .getElementById("cancelButton")
        ?.addEventListener("click", closePopup);
    });
};

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
