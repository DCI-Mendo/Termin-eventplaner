export function initContactPage() {
  console.log("Contact page initialized");

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;
  if (!contactForm) return;

  // Populate form with saved data from localStorage
  const savedName = localStorage.getItem("contactFormName");
  const savedEmail = localStorage.getItem("contactFormEmail");
  const savedMessage = localStorage.getItem("contactFormMessage");

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
      alert("Please fill out all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Save form data to localStorage
    localStorage.setItem("contactFormName", name);
    localStorage.setItem("contactFormEmail", email);
    localStorage.setItem("contactFormMessage", message);

    // Display success message and reset form
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();

    // Clear localStorage
    localStorage.removeItem("contactFormName");
    localStorage.removeItem("contactFormEmail");
    localStorage.removeItem("contactFormMessage");
  });
}
