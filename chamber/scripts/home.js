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

const weather = document.querySelector('#weather');
const weatherDescription = document.querySelector('#weather-description');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDetails = document.querySelector('#weather-details');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-2.9002833761003846&lon=-79.0055652767834&units=metric&appid=f77ac35e330c5324e8fffa27f8fe643b'

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-2.9002833761003846&lon=-79.0055652767834&units=metric&appid=f77ac35e330c5324e8fffa27f8fe643b';

async function getWeather() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(data) {
  const sunrise = new Date(data.sys.sunrise * 1000)
  const sunset = new Date(data.sys.sunset * 1000)

  const options = {
    hour: '2-digit',
    minute: '2-digit',
  }

  weather.textContent = data.main.temp + '°C';
  weatherDescription.textContent = data.weather[0].description.toUpperCase();
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" class="weather-icon">`;
  weatherDetails.innerHTML = `High: ${data.main.temp_max}°C </br> Low: ${data.main.temp_min}°C </br> Humidity: ${data.main.humidity}% </br> Sunrise: ${sunrise.toLocaleTimeString('en-US', options)} </br> Sunset: ${sunset.toLocaleTimeString('en-US', options)}`;
}

function displayForecast(data) {
  const middayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  const options = {
    weekday: 'long',
  };

  const forecastList = document.querySelector('#forecast-list');

  let forecastHTML = '';
  for (let i = 0; i < 3; i++) {
    const date = new Date(middayForecasts[i].dt * 1000);
    const dayName = date.toLocaleDateString('en-US', options);
    const temp = middayForecasts[i].main.temp;

    forecastHTML += `${dayName}: ${temp}°C<br>`;
  }

  forecastList.innerHTML = forecastHTML;
}

getWeather();

getForecast();

async function getMembers() {
  try {
    const response = await fetch('./data/members.json');
    if (response.ok) {
      const data = await response.json();
      displayRandomMembers(data.members);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

function displayRandomMembers(members) {
  const spotlightContainer = document.getElementById('spotlights');

  const eligibleMembers = members.filter(m =>
    m.membership === 'Silver' || m.membership === 'Gold'
  );

  const selected = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

  selected.forEach(member => {
    const card = document.createElement('div');
    card.setAttribute('class','spotlight-card');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.alt}">
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

getMembers();