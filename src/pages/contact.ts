export function initContactPage() {
  console.log("Contact page initialized");

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;
  const messageContainer = document.createElement("div");
  messageContainer.id = "messageContainer";
  contactForm?.parentNode?.insertBefore(messageContainer, contactForm);

  if (!contactForm) return;

  // Populate form with saved data from localStorage
  const savedName = localStorage.getItem("contactFormName");
  const savedEmail = localStorage.getItem("contactFormEmail");
  const savedMessage = localStorage.getItem("contactFormMessage");

  console.log("Retrieved from localStorage:", {
    savedName,
    savedEmail,
    savedMessage,
  });

  if (savedName)
    (document.getElementById("name") as HTMLInputElement).value = savedName;
  if (savedEmail)
    (document.getElementById("email") as HTMLInputElement).value = savedEmail;
  if (savedMessage)
    (document.getElementById("message") as HTMLTextAreaElement).value =
      savedMessage;

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

    // Save form data to localStorage
    console.log("Saving to localStorage:", { name, email, message });
    localStorage.setItem("contactFormName", name);
    localStorage.setItem("contactFormEmail", email);
    localStorage.setItem("contactFormMessage", message);

    // Display success message and reset form
    displayMessage(
      `Thank you, ${name}! Your message has been sent.`,
      "success",
    );
    contactForm.reset();

    // Clear localStorage
    // localStorage.removeItem("contactFormName");
    // localStorage.removeItem("contactFormEmail");
    // localStorage.removeItem("contactFormMessage");
  });

  function displayMessage(message: string, type: string) {
    messageContainer.textContent = message;
    messageContainer.className =
      type === "success" ? "text-green-600" : "text-red-600";
    messageContainer.classList.add("mt-4", "text-center");
  }
}
