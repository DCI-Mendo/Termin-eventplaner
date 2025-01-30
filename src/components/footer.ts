interface Subscriber {
  email: string;
  subscribedAt: Date;
}

export class FooterManager {
  private subscribers: Subscriber[] = [];

  constructor() {
    this.initializeEventListeners();
    this.loadSubscribers();
  }

  private initializeEventListeners(): void {
    this.setupSubscriptionForm();
  }

  private setupSubscriptionForm(): void {
    const newsletterForm = document.getElementById(
      "newsletter-form",
    ) as HTMLFormElement | null;
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (event) =>
        this.handleNewsletterSubscription(event),
      );
    }
  }

  private handleNewsletterSubscription(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector(
      'input[type="email"]',
    ) as HTMLInputElement | null;

    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!this.validateEmail(email)) {
      this.showMessage("Invalid email format.", "bg-red-500");
      return;
    }

    if (this.isAlreadySubscribed(email)) {
      this.showMessage("You are already subscribed!", "bg-yellow-500");
      return;
    }

    this.subscribeToNewsletter(email);
    this.showMessage("Thank you for subscribing!", "bg-green-500");
    emailInput.value = "";
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isAlreadySubscribed(email: string): boolean {
    return this.subscribers.some((subscriber) => subscriber.email === email);
  }

  private subscribeToNewsletter(email: string): void {
    const newSubscriber: Subscriber = { email, subscribedAt: new Date() };
    this.subscribers.push(newSubscriber);
    this.saveSubscribers();
    this.logSubscription(newSubscriber);
  }

  private saveSubscribers(): void {
    localStorage.setItem("subscribers", JSON.stringify(this.subscribers));
  }

  private loadSubscribers(): void {
    const storedSubscribers = localStorage.getItem("subscribers");
    if (storedSubscribers) {
      this.subscribers = JSON.parse(storedSubscribers);
    }
  }

  private logSubscription(subscriber: Subscriber): void {
    console.log(
      `New subscriber: ${subscriber.email} at ${subscriber.subscribedAt}`,
    );
    this.sendSubscriberToBackend(subscriber);
  }

  private async sendSubscriberToBackend(subscriber: Subscriber): Promise<void> {
    try {
      console.log("Subscriber data sent to backend:", subscriber);
    } catch (error) {
      console.error("Error sending subscriber data", error);
    }
  }

  private showMessage(message: string, bgColor: string): void {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add(
      bgColor,
      "text-white",
      "p-2",
      "rounded",
      "mt-2",
      "text-center",
    );
    messageContainer.textContent = message;

    const form = document.getElementById("newsletter-form");
    if (form) {
      form.appendChild(messageContainer);
      setTimeout(() => messageContainer.remove(), 3000);
    }
  }
}
