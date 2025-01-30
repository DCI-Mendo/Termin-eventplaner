import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "../features/router";
import { FooterManager } from "./components/footer";

const initApp = async () => {
  loadHeader();
  await loadFooter(); // Load the footer HTML
  new FooterManager(); // Instantiate FooterManager
  navigateTo(window.location.pathname);
};

const loadFooter = async () => {
  const response = await fetch("/src/components/footer.html");
  const footerHTML = await response.text();
  document.body.insertAdjacentHTML("beforeend", footerHTML);
};

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
