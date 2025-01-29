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

    // Initialize necessary event listeners  
    // Inicializar los eventos necesarios  
    private initializeEventListeners(): void {
        this.setupSubscriptionForm();
    }

    // Set up the subscription form event  
    // Configurar el evento del formulario de suscripción  
    private setupSubscriptionForm(): void {
        const newsletterForm = document.getElementById('newsletter-form') as HTMLFormElement | null;
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (event) => this.handleNewsletterSubscription(event));
        }
    }

    // Handle newsletter subscription  
    // Manejar la suscripción al newsletter  
    private handleNewsletterSubscription(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;

        if (!emailInput) return;

        const email = emailInput.value.trim();
        if (!this.validateEmail(email)) {
            this.showMessage('Invalid email format.', 'bg-red-500');
            this.showMessage('Formato de correo electrónico inválido.', 'bg-red-500');
            return;
        }

        if (this.isAlreadySubscribed(email)) {
            this.showMessage('You are already subscribed!', 'bg-yellow-500');
            this.showMessage('¡Ya estás suscrito!', 'bg-yellow-500');
            return;
        }

        this.subscribeToNewsletter(email);
        this.showMessage('Thank you for subscribing!', 'bg-green-500');
        this.showMessage('¡Gracias por suscribirte!', 'bg-green-500');
        emailInput.value = '';
    }

    // Validate email format  
    // Validar formato de correo electrónico  
    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Check if email is already subscribed  
    // Verificar si el correo ya está suscrito  
    private isAlreadySubscribed(email: string): boolean {
        return this.subscribers.some(subscriber => subscriber.email === email);
    }

    // Subscribe email to the newsletter  
    // Suscribir el correo al boletín  
    private subscribeToNewsletter(email: string): void {
        const newSubscriber: Subscriber = { email, subscribedAt: new Date() };
        this.subscribers.push(newSubscriber);
        this.saveSubscribers();
        this.logSubscription(newSubscriber);
    }

    // Save subscriber list to localStorage  
    // Guardar la lista de suscriptores en localStorage  
    private saveSubscribers(): void {
        localStorage.setItem('subscribers', JSON.stringify(this.subscribers));
    }

    // Load subscribers from localStorage  
    // Cargar suscriptores desde localStorage  
    private loadSubscribers(): void {
        const storedSubscribers = localStorage.getItem('subscribers');
        if (storedSubscribers) {
            this.subscribers = JSON.parse(storedSubscribers);
        }
    }

    // Log subscription to console  
    // Registrar la suscripción en la consola  
    private logSubscription(subscriber: Subscriber): void {
        console.log(`New subscriber: ${subscriber.email} at ${subscriber.subscribedAt}`);
        console.log(`Nuevo suscriptor: ${subscriber.email} a las ${subscriber.subscribedAt}`);
        this.sendSubscriberToBackend(subscriber);
    }

    // Simulate sending data to the backend  
    // Simular el envío de datos al backend  
    private async sendSubscriberToBackend(subscriber: Subscriber): Promise<void> {
        try {
            console.log('Subscriber data sent to backend:', subscriber);
            console.log('Datos del suscriptor enviados al backend:', subscriber);
        } catch (error) {
            console.error('Error sending subscriber data', error);
            console.error('Error al enviar datos del suscriptor', error);
        }
    }

    // Show success or error message in the UI  
    // Mostrar mensaje de éxito o error en la interfaz de usuario  
    private showMessage(message: string, bgColor: string): void {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add(bgColor, 'text-white', 'p-2', 'rounded', 'mt-2', 'text-center');
        messageContainer.textContent = message;

        const form = document.getElementById('newsletter-form');
        if (form) {
            form.appendChild(messageContainer);
            setTimeout(() => messageContainer.remove(), 3000);
        }
    }
}
