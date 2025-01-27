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
  isFavorite?: boolean; // Added property for favorites
}

export class EventService {
  private events: Event[] = [
    {
      id: "1",
      title: "Elegant Garden Wedding",
      description: "Romantic celebration with personalized decoration",
      category: "Weddings",
      price: 5000,
      duration: "8 hours",
      capacity: 200,
      icon: "fas fa-heart",
      details: "Full wedding organization service",
      isFavorite: false,
    },
    {
      id: "2",
      title: "Themed Kids Birthday Party",
      description: "Fun party with animation and decoration",
      category: "Birthdays",
      price: 1500,
      duration: "4 hours",
      capacity: 50,
      icon: "fas fa-birthday-cake",
      details: "Includes entertainers, games, and decoration",
      isFavorite: false,
    },
    {
      id: "3",
      title: "Corporate Tech Conference",
      description: "Networking event for IT professionals",
      category: "Corporate",
      price: 3000,
      duration: "1 day",
      capacity: 300,
      icon: "fas fa-laptop",
      details: "Includes international speakers and stands",
      isFavorite: false,
    },
    {
      id: "4",
      title: "Night Jazz Concert",
      description: "Musical evening with renowned artists",
      category: "Entertainment",
      price: 2500,
      duration: "3 hours",
      capacity: 150,
      icon: "fas fa-music",
      details: "Welcome cocktail and VIP area",
      isFavorite: false,
    },
    {
      id: "5",
      title: "Personal Development Seminar",
      description: "Growth and motivation workshop",
      category: "Educational",
      price: 800,
      duration: "6 hours",
      capacity: 100,
      icon: "fas fa-graduation-cap",
      details: "Includes materials and certification",
      isFavorite: false,
    },
    {
      id: "6",
      title: "Charity Gala",
      description: "Fundraising event",
      category: "Charity",
      price: 1200,
      duration: "5 hours",
      capacity: 250,
      icon: "fas fa-hands-helping",
      details: "Gala dinner and charity auction",
      isFavorite: false,
    },
    {
      id: "7",
      title: "Luxury Beach Wedding",
      description: "Celebrate your special day by the sea",
      category: "Weddings",
      price: 7000,
      duration: "10 hours",
      capacity: 180,
      icon: "fas fa-umbrella-beach",
      details: "Includes premium catering and decoration",
      isFavorite: false,
    },
    {
      id: "8",
      title: "Superhero Themed Party",
      description: "Exciting superhero costumes and activities",
      category: "Birthdays",
      price: 2000,
      duration: "5 hours",
      capacity: 60,
      icon: "fas fa-mask",
      details: "Includes costumes, games, and live characters",
      isFavorite: false,
    },
    {
      id: "9",
      title: "International Business Summit",
      description: "Global platform for networking and business growth",
      category: "Corporate",
      price: 5000,
      duration: "2 days",
      capacity: 400,
      icon: "fas fa-briefcase",
      details: "Workshops, keynote speeches, and networking sessions",
      isFavorite: false,
    },
    {
      id: "10",
      title: "Rock Concert Night",
      description: "Experience electrifying live music",
      category: "Entertainment",
      price: 3000,
      duration: "4 hours",
      capacity: 250,
      icon: "fas fa-guitar",
      details: "Live bands and food stalls",
      isFavorite: false,
    },
    {
      id: "11",
      title: "Mindfulness Retreat",
      description: "Find your inner peace and recharge",
      category: "Educational",
      price: 1000,
      duration: "2 days",
      capacity: 50,
      icon: "fas fa-leaf",
      details: "Includes yoga, meditation, and healthy meals",
      isFavorite: false,
    },
    {
      id: "12",
      title: "Art Auction Charity Night",
      description: "An exclusive evening to support a noble cause",
      category: "Charity",
      price: 3000,
      duration: "6 hours",
      capacity: 200,
      icon: "fas fa-palette",
      details: "Auction of unique art pieces",
      isFavorite: false,
    },
    {
      id: "13",
      title: "Rustic Barn Wedding",
      description: "Charming and intimate country wedding",
      category: "Weddings",
      price: 4000,
      duration: "6 hours",
      capacity: 150,
      icon: "fas fa-tree",
      details: "Includes rustic decor and live music",
      isFavorite: false,
    },
    {
      id: "14",
      title: "Pirate Adventure Party",
      description: "Embark on a thrilling pirate adventure",
      category: "Birthdays",
      price: 1700,
      duration: "4 hours",
      capacity: 40,
      icon: "fas fa-anchor",
      details: "Treasure hunt, costumes, and pirate games",
      isFavorite: false,
    },
    {
      id: "15",
      title: "Tech Expo 2025",
      description: "Showcase of the latest innovations in technology",
      category: "Corporate",
      price: 4000,
      duration: "1 day",
      capacity: 500,
      icon: "fas fa-microchip",
      details: "Interactive exhibits and keynote speeches",
      isFavorite: false,
    },
    {
      id: "16",
      title: "Classical Music Concert",
      description: "An evening of timeless classical pieces",
      category: "Entertainment",
      price: 2000,
      duration: "3 hours",
      capacity: 120,
      icon: "fas fa-violin",
      details: "Renowned orchestra and soloists",
      isFavorite: false,
    },
    {
      id: "17",
      title: "Leadership Workshop",
      description: "Develop leadership and management skills",
      category: "Educational",
      price: 1500,
      duration: "8 hours",
      capacity: 80,
      icon: "fas fa-chalkboard-teacher",
      details: "Interactive activities and certification",
      isFavorite: false,
    },
    {
      id: "18",
      title: "Charity Sports Event",
      description: "Participate and support local charities",
      category: "Charity",
      price: 500,
      duration: "1 day",
      capacity: 300,
      icon: "fas fa-running",
      details: "Includes sports competitions and prizes",
      isFavorite: false,
    },
  ];

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
  private eventsContainer: HTMLElement;
  private filterContainer: HTMLElement;

  constructor() {
    this.eventService = new EventService();
    this.eventsContainer = document.getElementById("eventsContainer")!;
    this.filterContainer = document.getElementById("filterButtons")!;
    this.initializeEvents();
    this.createCategoryFilters();
  }

  public initializeEvents(category?: string) {
    const events = category
      ? this.eventService.getEventsByCategory(category)
      : this.eventService.getAllEvents();
    // Ensure eventsContainer is not null before setting innerHTML
    if (this.eventsContainer) {
      this.eventsContainer.innerHTML = events
        .map((event) => this.createEventCard(event))
        .join("");
      this.attachBookingListeners(); // Attach functionality to the Booking buttons
      this.attachFavoriteListeners(); // Attach functionality to the Favorite buttons
    } else {
      console.error("eventsContainer element not found");
    }
  }

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
document.addEventListener("DOMContentLoaded", () => {
  const eventRenderer = new EventRenderer();
  eventRenderer.initializeEvents();
});
