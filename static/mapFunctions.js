
    var map;
    var currentJukeBox;
    var userLatLng;
    var userX;
    var userY;
    var jukeBoxDict = {"Jukebox1" : {'lat': 33.7756, 'long': -84.3963, 'song': "Usher - Yeah"},
               "Jukebox2" : {'lat': 33.7751, 'long': -84.3962, 'song': "Soulja Boy"},
               "Jukebox3" : {'lat': 33.7753, 'long': -84.3965, 'song': "Low"},
               "Jukebox4" : {'lat': 33.7755, 'long': -84.3961, 'song': "Cool Song"},
               "Jukebox5" : {'lat': 33.7759, 'long': -84.3965, 'song': "Glamorous"}
              };

    window.onload = geolocateUser;

    /////////////////
      function writeAddressName(latLng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "location": latLng
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
            document.getElementById("address").innerHTML = results[0].formatted_address;
          else
            document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
        });
      }
      /////////////////


      /////////////////
      function geolocationSuccess(position) {
        userX = position.coords.latitude;
        userY = position.coords.longitude;
        userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // Write the formatted address
        writeAddressName(userLatLng);


        ////////////////// Multiple Marker Code ///////////////////


      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: userLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();


      var marker;
      for (var key in jukeBoxDict) {
        var jukeBoxName = key;
        var locationX;
        var locationY;
        var song;
        for (key2 in jukeBoxDict[key]) {
            if (key2 == 'lat') {
              locationX = jukeBoxDict[key][key2];
              } else if (key2 == 'long') {
                locationY = jukeBoxDict[key][key2];
              } else {
                song = jukeBoxDict[key][key2];
              }
          }
          marker = new google.maps.Marker({position: new google.maps.LatLng(locationX, locationY), map: map});
          google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
              infowindow.setContent(jukeBoxName + "<br>" + "Song: " + song);
              infowindow.open(map, marker);
            }
          })(marker));
    }


    new google.maps.Marker({
          map: map,
          position: userLatLng
        });
        // Draw a circle around the user position to have an idea of the current localization accuracy
        var circle = new google.maps.Circle({
          center: userLatLng,
          radius: 1000, //position.coords.accuracy
          map: map,
          fillColor: '#0000FF',
          fillOpacity: 0.5,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0
        });
        map.fitBounds(circle.getBounds());        

        ////////////////// Multiple Marker Code ///////////////////
       // calculateJukebox();
      }
      /////////////////


      function geolocationError(positionError) {
        document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
      }

      function geolocateUser() {
        // If the browser supports the Geolocation API
        if (navigator.geolocation)
        {
          var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          };
          navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
        }
        else
          document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
      }





    function calculateJukebox(jukeBoxDict) {
      console.log("Inside calculateJukebox");
      console.log(jukeBoxDict);
      // Chunlok u never made it lat/long a string! :(
      var jukeBoxDistances = {};

      for (var key in jukeBoxDict) {
          for (var key2 in jukeBoxDict[key]) {
            if (key2 == "lat") {
              var currLat = jukeBoxDict[key][key2];
            } else if (key2 == "long") {
              var currLong = jukeBoxDict[key][key2];
            }
            }
            var euclideanDistance = Math.pow((currLat - userX), 2) + Math.pow((currLong - userY), 2);
            console.log(euclideanDistance);
            jukeBoxDistances[key] = euclideanDistance;

      }
      console.log(jukeBoxDistances);

      //currentJukeBox
      var shortestDist = 99999;
      for (var key in jukeBoxDistances) {
        if (jukeBoxDistances[key] < shortestDist) {
          currentJukeBox = key;
          shortestDist = jukeBoxDistances[key]; 
        } 
      }
      console.log(currentJukeBox);   
      var currBox_X = jukeBoxDict[currentJukeBox]['lat'];
      var currBox_Y = jukeBoxDict[currentJukeBox]['long'];
      var currBox_pos = new google.maps.LatLng(currBox_X, currBox_Y);
      var flightPath = new google.maps.Polyline({
        path: [userLatLng, currBox_pos],
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2
      });
      flightPath.setMap(map);
      console.log("Hello");
      console.log(currentJukeBox);
  }