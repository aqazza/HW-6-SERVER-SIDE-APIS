// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
var API_KEY = "282b70812a662caa0202f2918682c6c7";
var weatherApiRoot = "https://api.openweathermap.org";
var searchButton = document.querySelector("#search");
var searchBox = document.querySelector("#form");
var searchInput = document.querySelector("#searchInput");
var weatherSection = document.querySelector("#Todays-Forecast");

function renderWeather(city, weather) {
  var tempF = weather.main.temp;
  var title = document.createElement("h2");
  title.setAttribute("class", "cityName");
  title.textContent = `${city}`;

  var temperature = document.createElement("p");
  temperature.setAttribute("class", "temperature");
  temperature.textContent = `temperature: ${tempF}F`;

  weatherSection.append(title, temperature);
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
      renderWeather(city, data.list[0]);
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
