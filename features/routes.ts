import { initContactPage } from "../src/pages/contact";
import { openPopup, closePopup } from "../src/components/popup";
import { EventRenderer } from "../src/pages/eventBooking"; // Import EventRenderer

const routes: { [key: string]: string } = {
  "/": "home.html",
  "/calendar": "calendar.html",
  "/services": "eventsBooking.html",
  "/about": "about.html",
  "/contact": "contact.html",
};

export { routes };
