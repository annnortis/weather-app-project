function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city-input");
  let header = document.querySelector("h2");
  if (cityInput.value) {
    header.innerHTML = `${cityInput.value}`;
  }
  let apiKey = `fda3688b1db05987dd5d07c237aecfba`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#degrees");
  tempElement.innerHTML = `${temp}°`;
  let weatherCondition = document.querySelector(".main-weather");
  weatherCondition.innerHTML = `${
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1)
  }`;
}

function getUserLocation(event) {
  navigator.geolocation.getCurrentPosition(changeToUser);
  function changeToUser(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = `fda3688b1db05987dd5d07c237aecfba`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(changeUserData);
  }
}

function changeUserData(response) {
  let header = document.querySelector("h2");
  header.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#degrees");
  tempElement.innerHTML = `${temp}`;
  let weatherCondition = document.querySelector(".main-weather");
  weatherCondition.innerHTML = `${
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1)
  }`;
}

let userLocationButton = document.querySelector(".location-button");
userLocationButton.addEventListener("click", getUserLocation);

function degreesToCelsius(event) {
  event.preventDefault();
  degrees.innerHTML = "12°";
}

function degreesToFarenheit(event) {
  event.preventDefault();
  degrees.innerHTML = "53°";
}
let userCity = document.querySelector(".info-input");
userCity.addEventListener("submit", changeCity);

let userDate = document.querySelector("h6");
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
userDate.innerHTML = `${day} ${hours}:${minutes}`;

let degrees = document.querySelector("#degrees");
let degreesCelsius = document.querySelector("#celsius-link");
let degreesFarenheit = document.querySelector("#farenheit-link");
degreesCelsius.addEventListener("click", degreesToCelsius);
degreesFarenheit.addEventListener("click", degreesToFarenheit);
