const ham = document.querySelector('#ham-btn')
const nav = document.querySelector('#nav-bar')

ham.addEventListener('click', () => {
  ham.classList.toggle('show');
  nav.classList.toggle('show');
});

const date = document.querySelector('#lastModified');

if (date) {
  const formatted = new Date(document.lastModified).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  date.textContent = `Last modified: ${formatted}`;
}

const currentYear = document.querySelector('#currentyear');
if (currentYear) {
  const year = new Date().getFullYear();
  currentYear.innerHTML = `&copy; ${year}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const timestampField = document.getElementById("timestamp");
  const now = new Date().toISOString();
  timestampField.value = now;
});

const levels = {
  memberships: [
    {
      level: "NP Membership",
      cost: "Free",
      benefits: [
        "Access to monthly newsletters",
        "Invitation to community events",
        "Basic online support"
      ],
      description: "Free membership for non-profit organizations with limited benefits."
    },
    {
      level: "Bronze Membership",
      cost: "$50/year",
      benefits: [
        "Access to quarterly workshops",
        "Discounts on event tickets (10%)",
        "Featured in member directory"
      ],
      description: "Affordable option with basic event access and discounts."
    },
    {
      level: "Silver Membership",
      cost: "$150/year",
      benefits: [
        "All Bronze benefits",
        "Priority registration for events",
        "Advertising on homepage banner",
        "Exclusive training sessions"
      ],
      description: "Enhanced benefits for growing organizations."
    },
    {
      level: "Gold Membership",
      cost: "$300/year",
      benefits: [
        "All Silver benefits",
        "VIP access to special events",
        "Featured spotlight on homepage",
        "Personalized marketing support",
        "Free tickets to annual conference"
      ],
      description: "Premium membership with full access and marketing support."
    }
  ]
};

const levelsGrid = document.querySelector('.levels-grid');

levels.memberships.forEach(level => {
  const levelCard = document.createElement('div');
  levelCard.classList.add('level-card');

  levelCard.innerHTML = `<h3>${level.level}</h3>
    <button class="more">Learn More</button>`;

  levelsGrid.appendChild(levelCard);
});

const levelDetailsDialog = document.querySelector('#levels-details');

levelsGrid.addEventListener('click', (event) => {
  if (event.target.classList.contains('more')) {
    const levelCard = event.target.closest('.level-card');
    const levelName = levelCard.querySelector('h3').textContent;
    const levelDetailsDialog = document.querySelector('#levels-details');
    const level = levels.memberships.find(l => l.level === levelName);

    if (level) {
      levelDetailsDialog.innerHTML = `
        <h2>${level.level}</h2>
        <p>${level.description}</p>
        <h3>Benefits</h3>
        <ul>
          ${level.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        <h3>Price</h3>
        <p class="level-price">${level.cost}</p>
        <button id="close-btn">Close</button>
      `;
      levelDetailsDialog.showModal();
    }
  }
});

document.querySelector('#levels-details').addEventListener('click', (event) => {
  if (event.target.id === 'close-btn') {
    levelDetailsDialog.close();
  }
});