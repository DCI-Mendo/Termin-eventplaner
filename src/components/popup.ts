document.addEventListener("DOMContentLoaded", () => {
  const eventPopup = document.getElementById("eventPopup") as HTMLElement;
  const eventForm = document.getElementById("eventForm") as HTMLFormElement;
  const cancelButton = document.getElementById(
    "cancelButton",
  ) as HTMLButtonElement;

  // Function to show the popup
  function showPopup() {
    eventPopup.classList.remove("hidden");
    eventPopup.classList.add("flex");
  }

  // Function to hide the popup
  function hidePopup() {
    eventPopup.classList.remove("flex");
    eventPopup.classList.add("hidden");
  }

  // Event listener for the cancel button
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    hidePopup();
  });

  // Event listener for the form submission
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      time: formData.get("time"),
      budget: formData.get("budget"),
      guests: formData.get("guests"),
    };
    console.log("Event Data:", eventData);
    // Add your logic to save the event data here

    hidePopup();
  });

  // Example: Show the popup when a button with id "addEventButton" is clicked
  const addEventButton = document.getElementById("addEventButton");
  if (addEventButton) {
    addEventButton.addEventListener("click", showPopup);
  }
});
