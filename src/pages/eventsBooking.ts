import "../styles/index.css";

// Datos ficticios para eventos
const events = [
  {
    title: "Startup Your Idea Contest: Tech Pioneers",
    location: "Cologne, Germany",
    price: "Free",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "The Wild Party Night",
    location: "Cologne, Germany",
    price: "€15",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Großer Pflanzenmarkt in Köln",
    location: "Cologne, Germany",
    price: "€10",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Muslim Imam Husain Event",
    location: "Cologne, Germany",
    price: "Free",
    image: "https://via.placeholder.com/300x200",
  },
];

// Generar la lista de eventos
const generateEventCards = (events: any[]): string => {
  return events
    .map(
      (event) => `
        <div class="bg-blue-50 p-4 rounded shadow-md">
          <img src="${event.image}" alt="${event.title}" class="w-full rounded mb-4">
          <h3 class="text-lg font-semibold text-blue-600">${event.title}</h3>
          <p class="text-sm text-blue-500">${event.location}</p>
          <p class="text-sm text-blue-500 font-bold">${event.price}</p>
        </div>
      `
    )
    .join("");
};


// Función para inicializar la página de servicios
export function initServicesPage() {
  const app = document.querySelector("#app");
  if (app) {
    app.innerHTML = `
      <div class="container mx-auto p-4">
        <!-- Header de la página -->
        <header class="text-center mb-8">
          <h1 class="text-3xl font-bold text-blue-700">Do What You Love</h1>
          <p class="text-blue-500">Find events that match your passion</p>
        </header>

        <!-- Lista de eventos -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${generateEventCards(events)}
        </section>
      </div>
    `;
  }
}

