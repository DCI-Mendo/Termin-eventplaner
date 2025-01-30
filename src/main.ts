import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "../features/router";

const initApp = () => {
  loadHeader();
  navigateTo(window.location.pathname);
};

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});
