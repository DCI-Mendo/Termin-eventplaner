export function initContactPage() {
    console.log("Contact page initialized");
  
    const contactForm = document.getElementById("contactForm") as HTMLFormElement;
    if (!contactForm) return;
  
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
  
      // Display success message and reset form
      alert(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset();
    });
  }