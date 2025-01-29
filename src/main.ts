import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "../features/router";

const initApp = () => {
  // Load the header dynamically
  loadHeader();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);
};

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
