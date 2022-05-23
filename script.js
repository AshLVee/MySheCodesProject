let now = new Date();

let h6 = document.querySelector("h6");

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[now.getMonth()];

h6.innerHTML = `${day}, ${month} ${date}, ${year} @ ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#city-search");

form.addEventListener("submit", showCity);

function showCelsius(event) {
  event.preventDefault();
  let h3 = document.querySelector("h3");
  h3.innerHTML = "25";
}

function showFahrenheit(event) {
  event.preventDefault();
  let h3 = document.querySelector("h3");
  h3.innerHTML = "77";
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

// API Weather Code
function displayWeatherCondition(response) {
  document.querySelector("h5").innerHTML = response.data.name;
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "d2d095d2a441b48527653ce680813095";
  let city = document.querySelector("#city-search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${response.data.main.temp}`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d2d095d2a441b48527653ce680813095";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

navigator.geolocation.getCurrentPosition(showLocation);
