export function initContactPage() {
  console.log("Contact page initialized");

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;
  const messageContainer = document.createElement("div");
  messageContainer.id = "messageContainer";
  contactForm?.parentNode?.insertBefore(messageContainer, contactForm);

  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Client-side validation
    if (!name || !email || !message) {
      displayMessage("Please fill out all fields.", "error");
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
      displayMessage("Name can only contain alphabets.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      displayMessage("Please enter a valid email address.", "error");
      return;
    }

    displayMessage(
      `Thank you, ${name}! Your message has been sent.`,
      "success",
    );
    contactForm.reset();
  });

  function displayMessage(message: string, type: string) {
    messageContainer.textContent = message;
    messageContainer.className =
      type === "success" ? "text-green-600" : "text-red-600";
    messageContainer.classList.add("mt-4", "text-center");
  }
}
