export function openPopup() {
  const eventPopup = document.getElementById("eventPopup") as HTMLDivElement;
  eventPopup.classList.remove("hidden");
}

export function closePopup() {
  const eventPopup = document.getElementById("eventPopup") as HTMLDivElement;
  const eventForm = document.getElementById("eventForm") as HTMLFormElement;
  eventPopup.classList.add("hidden");
  eventForm.reset();
}
