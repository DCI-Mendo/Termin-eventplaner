// Dynamic data for team members
const teamMembers = [
  {
    name: "Marcus Stöppler",
    role: "Lead Developer",
    imageUrl: "path/to/marcus.jpg",
  },
  { name: "Ese Osagie", role: "UI/UX Designer", imageUrl: "path/to/ese.jpg" },
  {
    name: "Balta Garcia",
    role: "Project Manager",
    imageUrl: "path/to/balta.jpg",
  },
  {
    name: "Thana Alabsi",
    role: "UI/UX Designer",
    imageUrl: "path/to/thana.jpg",
  },
];

// Render team member cards
function renderTeam() {
  const teamSection = document.getElementById("teamSection") as HTMLElement;
  if (teamSection) {
    teamSection.innerHTML = teamMembers
      .map(
        (member) => `
          <div class="bg-white shadow-lg rounded-lg p-6">
            <img src="${member.imageUrl}" alt="${member.name}" class="h-16 w-16 rounded-full mb-4 mx-auto object-cover" />
            <h3 class="text-lg font-medium text-gray-800 text-center">${member.name}</h3>
            <p class="text-sm text-gray-600 text-center">${member.role}</p>
          </div>
        `,
      )
      .join("");
  }
}

// Initialize the About Us page
function initAboutPage() {
  renderTeam();
}

document.addEventListener("DOMContentLoaded", initAboutPage);
