# Weather_Dashboard
Weather Dashboard ft. API

In this app, the user enters the name of a city in the search field, then clicks the search button. 
The app displays the current weather conditions in that city, including temperature, humidity, (UV index), and a picture representing current coditions. 
Also included is a 5-day forecast which is displayed below the current conditions showing similar information (predicted at 12:00 PM on each day).


Each time a user searches for a city, a list displaying that search information is created underneath the search field. 

This app was created using the Open Weather Map data API. To obtain all the information needed, a good amount of manipulation of the response was needed, including taking information from one response to generate a new request. For example, the initial search based on city name returns latitude and longitude coordinates, and these coordinates are used in the UV Index get request.
