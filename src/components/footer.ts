// TypeScript Compilation File
interface Subscriber {
    email: string;
    subscribedAt: Date;
}

export class FooterManager {
    // Collection of subscribers
    private subscribers: Subscriber[] = [];

    constructor() {
        this.initializeEventListeners();
    }

    // Initialize event listeners
    private initializeEventListeners(): void {
        const newsletterForm = document.getElementById('newsletter-form') as HTMLFormElement | null;
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubscription.bind(this));
        }
    }

    // Handle newsletter subscription
    private handleNewsletterSubscription(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;

        if (!emailInput) return;

        const email = emailInput.value.trim();

        if (this.validateEmail(email)) {
            this.subscribeToNewsletter(email);
            this.showSuccessMessage();
            emailInput.value = '';
        } else {
            this.showErrorMessage();
        }
    }

    // Validate email format
    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Subscribe email to the newsletter
    private subscribeToNewsletter(email: string): void {
        const newSubscriber: Subscriber = {
            email,
            subscribedAt: new Date()
        };
        this.subscribers.push(newSubscriber);
        this.logSubscription(newSubscriber);
    }

    // Log subscription
    private logSubscription(subscriber: Subscriber): void {
        console.log(`New subscriber: ${subscriber.email} at ${subscriber.subscribedAt}`);
        // Simulate sending to backend (in a real scenario, you would make an API call)
        this.sendSubscriberToBackend(subscriber);
    }

    // Simulate sending subscriber to backend
    private sendSubscriberToBackend(subscriber: Subscriber): void {
        try {
            // Here you would add the logic to send data to a backend service
            console.log('Subscriber data sent to backend');
        } catch (error) {
            console.error('Error sending subscriber data', error);
        }
    }

    // Show success message
    private showSuccessMessage(): void {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded', 'mt-2', 'text-center');
        messageContainer.textContent = 'Thank you for subscribing!';
        
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.appendChild(messageContainer);
            // Remove message after 3 seconds
            setTimeout(() => {
                messageContainer.remove();
            }, 3000);
        }
    }

    // Show error message
    private showErrorMessage(): void {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded', 'mt-2', 'text-center');
        messageContainer.textContent = 'Please enter a valid email address';
        
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.appendChild(messageContainer);
            // Remove message after 3 seconds
            setTimeout(() => {
                messageContainer.remove();
            }, 3000);
        }
    }
}