// value of the input
var city = $("#searchTerm").val();

// API KEY
var APIKEY = "&appid=20e2d4563e93ba31f0594c3895ddf151";

// js function for today's day
var date = new Date();

$("#searchTerm").click(function(event) {
    {
        event.preventDefault();
        $("#seachBtn").click();
    }
});

// search button - on click results
$("#searchBtn").on("click", function () {
    $("#forecastH5").addClass("show");
    // log data from user input
    city = $("#searchTerm").val();
    $("#searchTerm").val("");

// current conditions ajax call
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKEY;

    $.ajax({
        url: queryURL,
        method: "GET"            
        })
      .then(function(response) {
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      getCurrentConditions(response);
      getCurrentForecast(response);
      makeList();
  })
});

  function makeList() {
      var listItem = $("<li>").addClass("list-group-item bg-primary").text(city);
      $(".list").append(listItem);
    }
// current condtions
    function getCurrentConditions (response) {

        var tempF = (response.main.temp - 273.15) * 1.80 +32;
        var lat = (response.coord.lat)
        var lon = (response.coord.lon)
        console.log(lat)
        console.log(lon)
        tempF = Math.floor(tempF);

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?" + APIKEY + "&lat=" + lat + "&lon=" + lon + "&cnt=1";
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(response)
            var uvIndex = uvResponse.value;
            var lat = (response.coord.lat)
            var lon = (response.coord.lon)
            console.log(lat)
            console.log(lon)    
            var badgeColor;
            if (uvIndex <= 3) {
                badgeColor = "green";
            }
            else if (uvIndex >= 3 || uvIndex <= 6) {
                badgeColor = "yellow";
            }
            else if (uvIndex >= 6 || uvIndex <= 8) {
                badgeColor = "orange";
            }
            else {
                badgeColor = "red";
            }
            var uvDisp = $("<p>").attr("class", "card-text").text("UV Index: ");
            uvDisp.append($("<span>").attr("class", "uvindex").attr("style", ("background-color:" + badgeColor)).text(uvIndex));
            cardBody.append(uvDisp);

        });
        

        $("#currentCity").empty();
        
        var card = $("<div>").addClass("card bg-primary text-white");
        var cardBody = $("<div>").addClass("card-body");
        var city = $("<h4>").addClass("card-title").text(response.name);
        var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString("en-US"));
        var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
        var descrip = $("<p>").addClass("card-text current-descrip").text("Current Conditions: " + response.weather[0].main);
        var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
        var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + "mph");
        var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
   
        city.append(cityDate, image)
        cardBody.append(city, descrip, temperature, humidity, wind);
        card.append(cardBody);
        $("#currentCity").append(card)
        };    

        
    // 5 day forecast
    function getCurrentForecast () {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKEY,
            method: "GET"
        }).then(function (response) {
            $("#forecast").empty();

// dt = Time of data calculation (data time for calculating 5 day forecast)
            var results = response.list;
        {
            for (var i = 0; i < response.list.length; i++) 
                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){
                    var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
                    var fullDate = response.list[0].dt_txt.slice(0, 7)
                
                var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp);

                var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
                var cityDate = $("<h4>").addClass("card-title").text(fullDate + "-" + day);
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + "F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png");
                
                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
      });
    
    }
    


