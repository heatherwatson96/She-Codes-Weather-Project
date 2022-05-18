let currentDate = new Date();

function getDate(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
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

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityInputCorrections = cityInput.value.trim().toUpperCase();
  let apiKey = "6089e4fb28464b6a73284bc65d80e7ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputCorrections}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  let place = response.data.name;
  let placeElement = document.querySelector("#place");
  placeElement.innerHTML = `${place}`;
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temp} °c`;
  let currentWeather = response.data.weather[0].main;
  let currentWeatherElement = document.querySelector("#current-weather");
  currentWeatherElement.innerHTML = `${currentWeather}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
  console.log();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
