var APIKey = "52d7c441eae27674374f75a3d6ba19c0"; // my key

// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&appid=" +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    handleResponse(response);
  });

function handleResponse(response) {
  // Log the queryURL
  console.log(queryURL);

  // Log the resulting object
  console.log(response);

  // Transfer content to HTML
  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
  $(".wind").text("Wind Speed: " + response.wind.speed);
  $(".humidity").text("Humidity: " + response.main.humidity);

  // Convert the temp to fahrenheit
  var tempF = (response.main.temp - 273.15) * 1.8 + 32;

  // add temp content to html
  $(".temp").text("Temperature (K) " + response.main.temp);
  $(".tempF").text("Temperature (F) " + tempF);

  // Log the data in the console as well
  console.log("Wind Speed: " + response.wind.speed);
  console.log("Humidity: " + response.main.humidity);
  console.log("Temperature (F): " + tempF);
}

console.log("this happens first");
