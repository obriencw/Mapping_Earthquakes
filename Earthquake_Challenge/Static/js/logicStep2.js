// Add console.log to check to see if our code is working.
console.log("working");



// // Coordinates for each point to be used in the line.
// let line = [
//     [37.6213, -122.3790],
//     [30.197637993901584, -97.66636363084373],
//     [43.67792708466169, -79.62486261709145],
//     [40.641453547754175, -73.77776359287613]
//   ];

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2> <hr> <h3> " + "Airport name: " + feature.properties.name + "</h3>");
//   }

// }).addTo(map);

// // Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3> " + feature.properties.city + ", " + feature.properties.country + "</h3>");
//   }

// }).addTo(map);

// let myStyle = {
//     color: "blue",
//     weight: 4,
//     opacity: 0.5,
//     dashArray: "5,10"
// };
// console.log(myStyle)
// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, 
//   myStyle

//   ).addTo(map);

// //  Add a marker to the map for Los Angeles, California.
// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
//  }).addTo(map);

// // Get data from cities.js
// let cityData = cities;

// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/100000
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the satelliteStreets view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {

  // We turn each feature into a circleMarker on the map.
  
  pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
          },
          style: styleInfo
      }).addTo(map);
  });

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/obriencw/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// // Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/obriencw/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// // Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/obriencw/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// // Create a style for the lines.
// let myStyle = {
//   color: "blue",
//   weight: 1,
//   fillColor: "yellow"

// }

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
// L.geoJson(data, {
//   style: myStyle,
//     // Called on each feature
// onEachFeature: function(feature, layer) {
// layer.bindPopup("<h2>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
//   }
// }).addTo(map);

// });
//   , {
//   style: myStyle,

//   // Called on each feature
//   onEachFeature: function(feature, layer) {
// layer.bindPopup("<h2>" + "Airline: " + feature.properties.airline + "</h2> <hr> <h3> Destination: " + "Airport name: " + feature.properties.dst + "</h3>");
//   }
// })
// .addTo(map);
// });