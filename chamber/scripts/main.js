const members = "./data/members.json";
const cards = document.querySelector('#members')

async function getMembersData() {
  let response = await fetch(members);
  let data = await response.json();
  displayMembers(data.members);
}

getMembersData();

function displayMembers(members) {
  members.forEach((member) => {
    let card = document.createElement('section');
    let name = document.createElement('h2');
    let description = document.createElement('p');
    let phone = document.createElement('p');
    let address = document.createElement('address');
    let url = document.createElement('a');
    let img = document.createElement('img');
    let level = document.createElement('p');

    url.setAttribute('href', member.website)
    img.setAttribute('src', member.image)
    img.setAttribute('alt', member.alt);
    description.setAttribute('class', 'description')

    name.textContent = `${member.name}`;
    phone.textContent = `Phone: ${member.phone}`;
    address.textContent = `Address: ${member.address}`;
    url.textContent = `${member.website}`;
    level.textContent = `${member.membership_level}`
    description.textContent = `${member.description}`

    card.appendChild(name);
    card.appendChild(img)
    card.appendChild(description)
    card.appendChild(phone);
    card.appendChild(address);
    card.appendChild(url)
    card.appendChild(level)

    cards.appendChild(card);
  })
}

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

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#members");

gridbutton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
  display.classList.add("list");
  display.classList.remove("grid");
}

const smallScreenQuery = window.matchMedia("(max-width: 37.999rem)");

function handleResize(event) {
  if (event.matches) {
    display.classList.add("grid");
    display.classList.remove("list");
  }
}

handleResize(smallScreenQuery);

smallScreenQuery.addEventListener("change", handleResize);