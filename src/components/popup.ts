import { eventsList } from "../data/events";

function openPopup(event: Event) {
  const target = event.target as HTMLElement;
  const eventId = target.getAttribute("data-id");
  if (!eventId) {
    console.error("Event ID not found");
    return;
  }

  fetch("/src/components/popup.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      const eventPopup = document.getElementById(
        "eventPopup",
      ) as HTMLDivElement;
      const eventForm = document.getElementById("eventForm") as HTMLFormElement;

      // Populate the form with event data
      const eventDetails = eventsList.find((event) => event.id === eventId);
      if (eventDetails) {
        (eventForm.elements.namedItem("title") as HTMLInputElement).value =
          eventDetails.title;
        (
          eventForm.elements.namedItem("description") as HTMLTextAreaElement
        ).value = eventDetails.description;
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

      document
        .getElementById("cancelButton")
        ?.addEventListener("click", closePopup);
    });
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
