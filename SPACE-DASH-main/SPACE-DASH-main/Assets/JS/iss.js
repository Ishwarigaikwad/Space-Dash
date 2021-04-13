// Reference variables
const showDataDiv = $("#showData");
const userBtn = $("#userBtn");
// Additonal global variables
let longitude = "";
let latitude = "";
let altitude = "";
let visibility = "";
let footprint = "";
let timestamp = "";
let daynum = "";
let solar_lat = "";
let solar_lon = "";
let velocity = "";
let country = "";

// init funtion
$(function () {

// Gets name from local storage for personalisation  
const fetchName = () => {
  let userName = (JSON.parse(localStorage.getItem('name'))); 
  if (userName === "" || userName === null) {
    $('.issName').text('friend');  
  } else {
  $('.issName').text(JSON.parse(localStorage.getItem('name'))); 
}};
fetchName()

// Generate map with Leaflet.js library map method setting default lat, long and scale
let issMap = L.map('mapid').setView([0, 0], 2);

// Generate tiles with mapbox
const getTiles = L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 1.5,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1Ijoic2FuZHlydWJ5IiwiYSI6ImNrZ3gxdWU4NTAwMnQycm52cHJocDJuMnIifQ.yEcd2QN_oOtUDi7r6u1ZSQ",
  }
).addTo(issMap);

// Create custom marker with Leaflet.js library
const issMarker = L.icon({
  iconUrl: "Assets/images/misc/iss-icon.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
});

// Add marker to map setting deafult values
const addMarker = L.marker([0,0], { icon: issMarker }).addTo(issMap);

// Call API for ISS coordinates
const getData = () => {
  const queryUrl = `https://api.wheretheiss.at/v1/satellites/25544`;
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch(function(){
      $('#countryVal').text("Whoops! The ISS can not be detected: it's possibly in stealth mode!");  
      });
};

// Function to pass and reassign ISS data to global variables so can reuse for other functions and event handlers
const handleWeatherData = (data) => {
  longitude = data.longitude;
  latitude = data.latitude;
  altitude = data.altitude;
  visibility = data.visibility;
  footprint = data.footprint;
  timestamp = data.timestamp;
  daynum = data.daynum;
  solar_lat = data.solar_lat;
  solar_lon = data.solar_lon;
  velocity = data.velocity;
  issMap.setView([latitude, longitude]);
  addMarker.setLatLng([latitude, longitude]);
  // add ISS data to dashboard
  $('#longitudeVal').text(longitude.toFixed(5));
  $('#latitudeVal').text(latitude.toFixed(5));
  $('#altitudeVal').text(altitude.toFixed(5));
  $('#visitbiltyVal').text(visibility);
  $('#footprintVal').text(footprint.toFixed(5));
  $('#daynumVal').text(daynum); 
  $('#sollatVal').text(solar_lat.toFixed(5));
  $('#sollongVal').text(solar_lon.toFixed(5));
  $('#velocityVal').text(velocity.toFixed(2));
  getLocation();
};

// Call ISS map on load and then set interval to move iss marker
getData();
setInterval(getData, 2000);

// Call API for ISS reverse geolocation
const getLocation = () => {
  //const iqkey = 'pk.0715cc466c0fd44018d880de0d78c1f2';
  const key = 'pk.eyJ1Ijoic2FuZHlydWJ5IiwiYSI6ImNrZ3gxdWU4NTAwMnQycm52cHJocDJuMnIifQ.yEcd2QN_oOtUDi7r6u1ZSQ';
  //const queryUrl = `https://us1.locationiq.com/v1/reverse.php?key=${iqkey}&lat=${latitude}&lon=${longitude}&format=json`;
  const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${key}`;  
  $.ajax({
    url: queryUrl,
  })
    .then(handleGeolocationData)
    .catch(function(){
    $('#countryVal').text("Place not detected - possibly above the ocean");  
    });
};

// Function to push geolocation data to DOM
const handleGeolocationData = (data) => {
  country = data.features[1].place_name;
  //country = data.address.country;
  $('#countryVal').text(country);
};

});

// button event listener to render coordinates on page
$(userBtn).on("click", (event) => {
  event.preventDefault();
  $(showDataDiv).empty();
  $(showDataDiv)
    .append(`<h2>Velocity: ${velocity} mph</h2>`)
});




