// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
var API_KEY = "282b70812a662caa0202f2918682c6c7";
var weatherApiRoot = "https://api.openweathermap.org";
var searchButton = document.querySelector("#search");
var searchBox = document.querySelector("#form");
var searchInput = document.querySelector("#searchInput");
var weatherSection = document.querySelector("#todays-forecast");

function renderWeather(city, weather) {
  var tempF = weather.temp.day;
  var title = document.createElement("h2");
  title.setAttribute("class", "cityName");
  title.textContent = `${city}`;

  var temperature = document.createElement("p");
  temperature.setAttribute("class", "temperature");
  temperature.textContent = `temperature: ${tempF}F`;

  weatherSection.append(title, temperature);
}

function renderForecast(city, weather) {
  console.log(weather);
  weatherSection.innerHTML = "";

  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");

  for (let index = 1; index < 6; index++) {
    const forecastCard = document.createElement("div");
    forecastCard.setAttribute("class", "forecast-card");
    const forecastCardTitle = document.createElement("h3");
    forecastCardTitle.setAttribute("class", "forecast-card-title");

    const forecastCardTemp = document.createElement("div");
    const forecastCardHumidity = document.createElement("div");
    forecastCardTemp.setAttribute("class", "temperature");
    forecastCardHumidity.setAttribute("class", "humidity");
    forecastCardTemp.innerHTML = `Temperature: ${weather[index].temp.day}°F`;
    forecastCardHumidity.innerHTML = `Humidity: ${weather[index].humidity}%`;

    const forecastCardDate = new Date();
    forecastCardDate.setDate(forecastCardDate.getDate() + index);
    const dayOfWeek = forecastCardDate.toLocaleString("en-us", {
      weekday: "long",
    });
    forecastCardTitle.textContent = `${dayOfWeek}`;

    // one of these for every property neede

    forecastCard.appendChild(forecastCardTitle);
    forecastCard.appendChild(forecastCardTemp);
    forecastCard.appendChild(forecastCardHumidity);

    weatherSection.appendChild(forecastCard);
  }
}

function fetchAPI(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;
  const apiUrl = `${weatherApiRoot}/data/3.0/onecall?units=imperial&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //this console log will log the shape of data returned
      console.log(city, data);
      //depending on shape of data, send what you need to the renderWeather function
      renderWeather(city, data.daily[0]);
      renderForecast(city, data.daily);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getCoordinates(search) {
  var apiUrl = `${weatherApiRoot}/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Location not found");
      } else {
        fetchAPI(data[0]);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
function handleGetWeather(event) {
  if (!searchInput.value) {
    return;
  }
  event.preventDefault();
  let search = searchInput.value.trim();
  getCoordinates(search);
  searchInput.value = "";
}
searchBox.addEventListener("submit", handleGetWeather);

// searchButton.addEventListener("submit", function (event) {
//   var btn = event.target;
//   var search = btn.getAttribute("data-search");
//   getCoordinates(search);
// });
