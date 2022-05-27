let currentDate = new Date();

function getDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day}, ${hour}:${minutes}`;
}
let liveDateElement = document.querySelector("#live-date");
liveDateElement.innerHTML = getDate(currentDate);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row days-container">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col day-background days all-days-container">
      <div class="weather-forecast-date" >${formatDay(
        forecastDay.dt
      )}</div>${index}
        <img 
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="42"/>
        <div class="weather-forecast-temperature">
        
        
        <span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}° |</span>
          
          
          <span class="weather-forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
            </div>
            </div>
            `;
      console.log(response.data);
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6089e4fb28464b6a73284bc65d80e7ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}
function showTemp(response) {
  let place = response.data.name;
  let placeElement = document.querySelector("#place");
  placeElement.innerHTML = `${place}`;

  let currentWeather = response.data.weather[0].main;
  let currentWeatherElement = document.querySelector("#current-weather");
  currentWeatherElement.innerHTML = `${currentWeather}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity} %`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} <small>m/ps</small>`;

  celciusTemp = response.data.main.temp;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${Math.round(celciusTemp)}°C`;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(cityInputName) {
  let cityInputCorrections = cityInputName.trim().toUpperCase();
  let apiKey = "6089e4fb28464b6a73284bc65d80e7ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputCorrections}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function handlePexelsResponse(response) {
  console.log(response.data.photos[0].src.portrait);

  let locationTimeBackgroundElement = document.querySelector(
    "#location-time-background"
  );

  locationTimeBackgroundElement.style.backgroundImage = `url("${response.data.photos[0].src.portrait}")`;
}
function getCityPic(cityName) {
  let pexelsApiKey = "563492ad6f9170000100000104663ae2c247449f800144770696fdb3";
  let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${cityName}&orientation=portrait`;

  axios
    .get(`${pexelsApiUrl}`, {
      headers: {
        Authorization: pexelsApiKey,
      },
    })
    .then(handlePexelsResponse);
}
function onSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  getCityPic(cityInput.value);
  searchCity(cityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${Math.round(celciusTemp)}°C`;
}
let celciusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", onSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("Glasgow");
getCityPic("Mountains night");
