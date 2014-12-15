    var map;
    var marker;
    var geocoder;
    var locations = [];
    var offset = 10;

    SC.initialize({
    	client_id: "64a4fa9fc8c9797be3c6dc27067c131c",
    });

    function initialize() {
        geocoder = new google.maps.Geocoder();
        var mapOptions = {
            center: { lat: 0, lng: 0},
            zoom: 3,
            disableDefaultUI: true,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };

        // Map styling
        var styles = [
        {
            stylers: [
                { saturation: -100 }
            ]
        },{
            featureType: "all",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "road",
            elementType: "all",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "landscape.natural.terrain",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "landscape.natural.landcover",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "country",
            elementType: "geometry.stroke",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              { visibility: "off" }
            ]
          }
        ];

        // Creating map
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.setOptions({styles: styles});

        // Populating locations array
        findLocations();
    }

    // Create locations array
    function findLocations() {
        SC.get("/tracks", { limit: 10, offset: offset }, function(tracks){
            console.log(tracks.length);
            offset += 10;
            for (var i = 0; i < tracks.length; i++) {
                SC.get("/users/" + tracks[i].user_id, function(user){
                    if (user.country) { 
                        locations.push(user.country);
                        console.log(user.country);
                    }
                });
            }
            locate();
        });
    }

    // Add next location to map
    function locate() {
        console.log(locations);
        if (locations.length > 0) {
            gcode(locations.pop());
        } else {
            findLocations();
        }
    }

    // Mark location onto map
    function gcode(country) {
        var infowindow = new google.maps.InfoWindow();
    	geocoder.geocode( { 'address': country }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow = new google.maps.InfoWindow({
                        content: country
                    });
                    infowindow.open(map, marker);
                });
                map.setCenter(results[0].geometry.location);
            }
    	});
    }
