import homePage from "../src/pages/home";
import contactPage from "../src/pages/contact";
import notFoundPage from "../src/pages/notFound";
import aboutPage from "../src/pages/about";
import EventsPage from "../src/data/events"; // Corrected path
import servicesPage from "../src/pages/eventBooking";
import calendarPage from "../src/pages/calendar";

const routes = [
  {
    path: "/",
    page: homePage,
  },
  {
    path: "/calendar",
    page: calendarPage,
  },
  {
    path: "/eventsBooking",
    page: servicesPage,
  },
  {
    path: "/events/:id",
    page: EventsPage,
  },
  {
    path: "/about",
    page: aboutPage,
  },
  {
    path: "/contact",
    page: contactPage,
  },
  {
    path: "*",
    page: notFoundPage,
  },
];

export { routes };
