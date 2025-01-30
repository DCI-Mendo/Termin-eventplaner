import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "../features/router";
import { closePopup } from "./components/popup";

const initApp = () => {
  loadHeader();

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

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
