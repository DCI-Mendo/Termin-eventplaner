// Dynamic data for team members
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}
const teamMembers: TeamMember[] = [
  {
    name: "Marcus Stöppler",
    role: "Lead Developer",
    imageUrl: "logos/Avatar1.2.png",
  },
  {
    name: "Ese Osagie",
    role: "UI/UX Designer",
    imageUrl: "logos/1714924078739.jpg",
  },
  {
    name: "Balta Garcia",
    role: "Project Manager",
    imageUrl: "logos/150234848.jpeg",
  },
  {
    name: "Thana Alabsi",
    role: "UI/UX Designer",
    imageUrl: "logos/thana.jpg",
  },
];

// Render team member cards
function renderTeam() {
  const teamSection = document.getElementById("teamSection") as HTMLElement;
  if (teamSection) {
    teamSection.innerHTML = teamMembers
      .map(
        (member) => `
              <div class="team-card shadow-lg rounded-lg p-6">
                <img src="${member.imageUrl}" alt="${member.name}" class="h-16 w-16 rounded-full mb-4 mx-auto object-cover" />
                <h3 class="text-lg font-medium text-center">${member.name}</h3>
                <p class="text-sm text-center">${member.role}</p>
              </div>
            `,
      )
      .join("");
  }
}

// Initialize the About Us page
export function initAboutPage() {
  renderTeam();
}

document.addEventListener("DOMContentLoaded", initAboutPage);
