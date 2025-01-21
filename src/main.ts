import "./styles/index.css";
import { loadHeader } from "./components/header";
import { navigateTo } from "./router";

document.addEventListener("DOMContentLoaded", () => {
	loadHeader();
	navigateTo(window.location.pathname);
});
