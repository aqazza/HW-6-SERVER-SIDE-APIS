// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
var API_KEY = "1401623932563c24702a8d3ac1d62c4b";
var weatherApiRoot = "https://api.openweathermap.org";
var searchButton = document.querySelector("#Search");
var searchBox = document.querySelector("#searchInput");
function fetchAPI(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;
  const apiUrl = `${weatherApiRoot}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(city, data);
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

searchBox.addEventListener("submit", function (event) {
  if (!searchBox.value) {
    return;
  }
  event.preventDefault();
  let search = searchBox.value.trim();
  getCoordinates(search);
  searchBox.value = "";
});
searchButton.addEventListener("click", function (event) {
  var btn = event.target;
  var search = btn.getAttribute("data-search");
  getCoordinates(search);
});
