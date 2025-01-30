import { eventsList } from "../data/events"; // Import the eventsList from events.ts

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  capacity: number;
  icon: string;
  details: string;
  isFavorite: boolean;
}

// Use the imported eventsList to initialize the events array
class EventService {
  private events: Event[];

  constructor() {
    this.events = eventsList; // Initialize with the imported eventsList
  }

  getAllEvents(): Event[] {
    return this.events;
  }

  getEventsByCategory(category: string): Event[] {
    return this.events.filter((event) => event.category === category);
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.events.map((event) => event.category))];
  }

  toggleFavorite(eventId: string): void {
    const event = this.events.find((event) => event.id === eventId);
    if (event) {
      event.isFavorite = !event.isFavorite; // Toggle favorite status
    }
  }

  bookEvent(eventId: string): boolean {
    const event = this.events.find((event) => event.id === eventId);
    if (event && event.capacity > 0) {
      event.capacity -= 1; // Decrease capacity by 1
      return true;
    }
    return false;
  }
}

export class EventRenderer {
  private eventService: EventService;
  private eventsContainer: HTMLElement | null;
  private filterContainer: HTMLElement | null;

  constructor() {
    this.eventService = new EventService();
    this.eventsContainer = document.getElementById("eventsContainer");
    this.filterContainer = document.getElementById("filterButtons");

    if (this.eventsContainer && this.filterContainer) {
      this.initializeEvents();
      this.createCategoryFilters();
    } else {
      console.error("Required elements not found");
    }
  }

  // Initialize events based on the selected category
  public initializeEvents(category?: string) {
    console.log("Initializing events");
    const events = category
      ? this.eventService.getEventsByCategory(category)
      : this.eventService.getAllEvents();
    // Ensure eventsContainer is not null before setting innerHTML
    if (this.eventsContainer) {
      this.eventsContainer.innerHTML = events
        .map(
          (event) =>
            `<a href="event-details.html?id=${event.id}" class="event-card">
              ${this.createEventCard(event)}</a>`,
        )
        .join("");
      this.attachFavoriteListeners(); // Attach functionality to the Favorite buttons
      this.attachBookingListeners(); // Attach functionality to the Booking buttons
    } else {
      console.error("eventsContainer element not found");
    }
  }

  // Render the details of a specific event
  public renderEventDetails(eventId: string) {
    const event = this.eventService
      .getAllEvents()
      .find((event) => event.id === eventId);

    if (event && this.eventsContainer) {
      this.eventsContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-blue-600">${event.title}</h2>
            <p class="text-gray-600 mb-4">${event.description}</p>
            <p class="font-semibold">Price: ${event.price} €</p>
            <p class="text-sm text-gray-500">Duration: ${event.duration}</p>
            <p class="text-sm text-gray-500">Category: ${event.category}</p>
            <p class="text-sm text-gray-500">Details: ${event.details}</p>
            <div class="flex justify-between items-center mt-4">
              <button class="booking-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" 
                data-id="${event.id}" ${event.capacity === 0 ? "disabled" : ""}>
                ${event.capacity === 0 ? "Sold Out" : "Book Now"}
              </button>
              <button class="favorite-button ${event.isFavorite ? "text-red-500" : "text-gray-500"} hover:text-red-600" data-id="${event.id}">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      this.attachFavoriteListeners(); // Attach functionality to the Favorite buttons
      this.attachBookingListeners(); // Attach functionality to the Booking buttons
    } else {
      console.error("Event not found or eventsContainer element not found");
    }
  }

  // Create an event card for each event
  private createEventCard(event: Event): string {
    const isSoldOut = event.capacity === 0;

    return `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-blue-600">${event.title}</h2>
            <i class="${event.icon} text-3xl text-blue-500"></i>
          </div>
          <p class="text-gray-600 mb-4">${event.description}</p>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <div>
              <p class="font-semibold">Price: ${event.price} €</p>
              <p class="text-sm text-gray-500">Duration: ${event.duration}</p>
            </div>
            <div>
              <p class="font-semibold">Capacity: ${event.capacity}</p>
              <p class="text-sm text-gray-500">Category: ${event.category}</p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <button class="booking-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" 
              data-id="${event.id}" ${isSoldOut ? "disabled" : ""}>
              ${isSoldOut ? "Sold Out" : "Booking"}
            </button>
            <div class="flex space-x-2">
              <button class="favorite-button ${event.isFavorite ? "text-red-500" : "text-gray-500"} hover:text-red-600" data-id="${event.id}">
                <i class="fas fa-heart"></i>
              </button>
              <a href="event-details.html?id=${event.id}" class="text-blue-500 hover:text-blue-600">
                <i class="fas fa-info-circle"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Create category filters
  private createCategoryFilters() {
    const categories = this.eventService.getUniqueCategories();

    const allButton = `
      <button class="category-filter px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
        data-category="all">
        All
      </button>
    `;

    const categoryButtons = categories
      .map(
        (category) => `
        <button class="category-filter px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-blue-500 hover:text-white transition" 
          data-category="${category}">
          ${category}
        </button>
      `,
      )
      .join("");

    // Ensure filterContainer is not null before setting innerHTML
    if (this.filterContainer) {
      this.filterContainer.innerHTML = allButton + categoryButtons;
      this.attachFilterListeners();
    } else {
      console.error("filterContainer element not found");
    }
  }

  // Attach filter listeners to filter buttons
  private attachFilterListeners() {
    const filterButtons = document.querySelectorAll(".category-filter");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        filterButtons.forEach((btn) =>
          btn.classList.remove("bg-blue-500", "text-white"),
        );
        button.classList.add("bg-blue-500", "text-white");

        if (category === "all") {
          this.initializeEvents();
        } else {
          this.initializeEvents(category!);
        }
      });
    });
  }

  // Attach booking listeners to booking buttons
  private attachBookingListeners() {
    const bookingButtons = document.querySelectorAll(".booking-button");

    bookingButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const eventId = button.getAttribute("data-id");
        const success = this.eventService.bookEvent(eventId!);

        if (success) {
          alert("Booking successful!");
          this.initializeEvents(); // Re-render events to update capacities
        } else {
          alert("Booking failed. Event is sold out.");
        }
      });
    });
  }

  // Attach favorite listeners to favorite buttons
  private attachFavoriteListeners() {
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const eventId = button.getAttribute("data-id");
        this.eventService.toggleFavorite(eventId!);
        this.initializeEvents(); // Re-render events to update favorites
      });
    });
  }
}
