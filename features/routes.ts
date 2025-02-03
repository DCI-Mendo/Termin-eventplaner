const routes = [
  { path: "/", page: "home.html" },
  { path: "/calendar", page: "calendar.html" },
  { path: "/services", page: "eventsBooking.html" },
  { path: "/services/:id", page: "eventsBooking.html" }, // Add this route for event details
  { path: "/about", page: "about.html" },
  { path: "/contact", page: "contact.html" },
];

export { routes };
