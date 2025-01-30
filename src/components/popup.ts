import { eventsList } from "../data/events";

function openPopup(eventId: string) {
  const eventPopup = document.getElementById("eventPopup") as HTMLDivElement;
  const eventForm = document.getElementById("eventForm") as HTMLFormElement;

  // Populate the form with event data
  const eventDetails = eventsList.find((event) => event.id === eventId);
  if (eventDetails) {
    (eventForm.elements.namedItem("title") as HTMLInputElement).value =
      eventDetails.title;
    (eventForm.elements.namedItem("description") as HTMLTextAreaElement).value =
      eventDetails.description;
    (eventForm.elements.namedItem("category") as HTMLInputElement).value =
      eventDetails.category;
    (eventForm.elements.namedItem("price") as HTMLInputElement).value =
      eventDetails.price.toString();
    (eventForm.elements.namedItem("duration") as HTMLInputElement).value =
      eventDetails.duration;
    (eventForm.elements.namedItem("capacity") as HTMLInputElement).value =
      eventDetails.capacity.toString();
  }

  eventPopup.classList.remove("hidden");
}

function closePopup(event: Event) {
  console.log("Event type:", event.type);
  console.log("Event target:", event.target);

  const eventPopup = document.getElementById("eventPopup") as HTMLDivElement;
  const eventForm = document.getElementById("eventForm") as HTMLFormElement;
  eventPopup.classList.add("hidden");
  eventForm.reset();
}

export { openPopup, closePopup };
