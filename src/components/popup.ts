import { eventsList } from "../data/events";

function openPopup(eventId: string) {
  const eventPopup = document.getElementById("eventPopup") as HTMLDivElement;
  const eventForm = document.getElementById("eventForm") as HTMLFormElement;

  // Populate the form with event data
  const event = eventsList.find((event) => event.id === eventId);
  if (event) {
    (eventForm.elements.namedItem("title") as HTMLInputElement).value =
      event.title;
    (eventForm.elements.namedItem("description") as HTMLTextAreaElement).value =
      event.description;
    (eventForm.elements.namedItem("category") as HTMLInputElement).value =
      event.category;
    (eventForm.elements.namedItem("price") as HTMLInputElement).value =
      event.price.toString();
    (eventForm.elements.namedItem("duration") as HTMLInputElement).value =
      event.duration;
    (eventForm.elements.namedItem("capacity") as HTMLInputElement).value =
      event.capacity.toString();
  }

  eventPopup.classList.remove("hidden");
}

function closePopup() {
  const eventPopup = document.getElementById("eventPopup") as HTMLDivElement;
  const eventForm = document.getElementById("eventForm") as HTMLFormElement;
  eventPopup.classList.add("hidden");
  eventForm.reset();
}

export { openPopup, closePopup };
