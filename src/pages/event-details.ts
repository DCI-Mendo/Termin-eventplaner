import { EventService } from "./eventsBooking";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");

  console.log("Event ID from URL:", eventId); // Debugging log

  const eventService = new EventService();
  const events = eventService.getAllEvents();
  console.log("All events:", events); // Debugging log

  const event = events.find((e) => e.id === eventId);
  console.log("Found event:", event); // Debugging log

  if (event) {
    document.getElementById("eventTitle")!.textContent = event.title;
    document.getElementById("eventDetails")!.innerHTML = `
      <p class="text-gray-600 mb-4">${event.description}</p>
      <p><strong>Price:</strong> ${event.price} €</p>
      <p><strong>Duration:</strong> ${event.duration}</p>
      <p><strong>Capacity:</strong> ${event.capacity}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p class="mt-4">${event.details}</p>
    `;
  } else {
    document.getElementById("eventDetails")!.textContent =
      "Evento no encontrado.";
  }
});

function navigateBack(event: Event) {
  event.preventDefault();
  window.location.href = "eventsBooking.html";
}
// Attach the function to the window object
(window as any).navigateBack = navigateBack;
