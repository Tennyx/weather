$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var apiKey = //insert api key here from wunderground
    
    $.getJSON("https://api.wunderground.com/api/" + apiKey + "/q/"+ lat + "," + lon + ".json", function(json){
      var temp = Math.round(json["current_observation"]["temp_f"]);
    
      if(Number(temp) <= 70){
        $("#temp").css({"color":"#0077E5"});
      }else if(Number(temp) > 70 && Number(temp) <= 90){
        $("#temp").css({"color":"#e56d16"});
      }else if(Number(temp) > 90){
        $("#temp").css({"color":"#bc1818"});
      }
        
      
      $("#loc").html(json["current_observation"]["display_location"]["full"]);
      $("#temp").html(temp);
      $("#degrees").html("&#x2109;");
      $("#conditions").html(json["current_observation"]["weather"]);
      
      var timeNum = json["current_observation"]["local_time_rfc822"].slice(17, -12);
      
      if(timeNum > 7 && timeNum < 18){
        var answer = "";                                                           
        switch(json["current_observation"]["weather"]){
          case "Overcast":
            answer = "wi wi-day-sunny-overcast";
            break;
          case "Drizzle":
            answer = "wi wi-day-rain-mix";
            break;
          case "Snow":
          case "Snow Grains":
          case "Ice Crystals":
          case "Ice Pellets":
          case "Low Drifting Snow":
          case "Blowing Snow":
          case "Snow Showers":
          case "Snow Blowing Snow Mist":
          case "Ice Pellet Showers":
            answer = "wi wi-day-snow";
            break;
          case "Hail":
          case "Spray":
          case "Rain Mist":
          case "Hail Showers":
          case "Small Hail Showers":
          case "Freezing Drizzle":
          case "Freezing Rain":
          case "Small Hail":
            answer = "wi wi-day-rain-mix";
            break;
          case "Mist":
          case "Fog":
          case "Fog Patches":
          case "Haze":
          case "Freezing Fog":
          case "Patches of Fog":
          case "Shallow Fog":
          case "Partial Fog":
            answer = "wi wi-day-fog";
            break;
          case "Smoke":
          case "Volcanic Ash":
            answer = "wi wi-smoke";
            break;
          case "Widespread Dust":
          case "Low Drifting Widespread Dust":
          case "Blowing Widespread Dust":
            answer = "wi wi-dust";
            break;
          case "Dust Whirls":
          case "Sand":
          case "Low Drifting Sand":
          case "Blowing Sand":
            answer = "wi wi-sandstorm";
            break;
          case "Rain":
          case "Rain Showers":
          case "Squalls":
            answer = "wi wi-day-rain";
            break;
          case "Thunderstorm":
          case "Thunderstorms and Rain":
          case "Thunderstorms and Snow":
          case "Thunderstorms and Ice Pellets":
          case "Thunderstorms with Hail":
          case "Thunderstorms with Small Hail":
            answer = "wi wi-day-thunderstorm";
            break;
          case "Clear":
            answer = "wi wi-day-sunny";
            break;
          case "Partly Cloudy":
          case "Mostly Cloudy":
          case "Scattered Clouds":
            answer = "wi wi-day-cloudy";
            break;
          case "Funnel Cloud":
            answer = "wi wi-tornado";
            break;
          case "Unknown Precipitation":
          case "Unknown":
            answer = "fa fa-question"
        } 
        $("#icon").attr("class", answer);
      }
      else{
        var answer = "";                                          //nighttime switch
        switch(json["current_observation"]["weather"]){
          case "Overcast":
            answer = "wi wi-night-alt-cloudy";
            break;
          case "Drizzle":
            answer = "wi wi-night-rain-mix";
            break;
          case "Snow":
          case "Snow Grains":
          case "Ice Crystals":
          case "Ice Pellets":
          case "Low Drifting Snow":
          case "Blowing Snow":
          case "Snow Showers":
          case "Snow Blowing Snow Mist":
          case "Ice Pellet Showers":
            answer = "wi wi-night-snow";
            break;
          case "Hail":
          case "Spray":
          case "Rain Mist":
          case "Hail Showers":
          case "Small Hail Showers":
          case "Freezing Drizzle":
          case "Freezing Rain":
          case "Small Hail":
            answer = "wi wi-night-rain-mix";
            break;
          case "Mist":
          case "Fog":
          case "Fog Patches":
          case "Haze":
          case "Freezing Fog":
          case "Patches of Fog":
          case "Shallow Fog":
          case "Partial Fog":
            answer = "wi wi-night-fog";
            break;
          case "Smoke":
          case "Volcanic Ash":
            answer = "wi wi-smoke";
            break;
          case "Widespread Dust":
          case "Low Drifting Widespread Dust":
          case "Blowing Widespread Dust":
            answer = "wi wi-dust";
            break;
          case "Dust Whirls":
          case "Sand":
          case "Low Drifting Sand":
          case "Blowing Sand":
            answer = "wi wi-sandstorm";
            break;
          case "Rain":
          case "Rain Showers":
          case "Squalls":
            answer = "wi wi-night-rain";
            break;
          case "Thunderstorm":
          case "Thunderstorms and Rain":
          case "Thunderstorms and Snow":
          case "Thunderstorms and Ice Pellets":
          case "Thunderstorms with Hail":
          case "Thunderstorms with Small Hail":
            answer = "wi wi-night-thunderstorm";
            break;
          case "Clear":
            answer = "wi wi-night-clear";
            break;
          case "Partly Cloudy":
          case "Mostly Cloudy":
          case "Scattered Clouds":
            answer = "wi wi-night-cloudy";
            break;
          case "Funnel Cloud":
            answer = "wi wi-tornado";
            break;
          case "Unknown Precipitation":
          case "Unknown":
            answer = "fa fa-question"
        } 
        $("#icon").attr("class", answer);
      }
       $("#temp").on("click", function(){
      
        if($("#degrees").html() == "℉") {
             $("#degrees").html("&#x2103;");
             $("#temp").html(Math.round(json["current_observation"]["temp_c"]));
        }
        else{
             $("#degrees").html("&#x2109;");
             $("#temp").html(Math.round(json["current_observation"]["temp_f"]));
         }
     
        });
      });
    });
  }
});