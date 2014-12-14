var map;
var marker;
var geocoder;
var addresses = [];

SC.initialize({
	client_id: "64a4fa9fc8c9797be3c6dc27067c131c",
});

function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: { lat: 0, lng: 0},
        zoom: 2,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    };

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

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({styles: styles});
}

function locate() {
	// Get locations
	SC.get("/tracks", function(tracks){
		for (var i = 0; i < tracks.length; i++) {
			SC.get("/users/" + tracks[i].user_id, function(user){
				if (user.country) {	gcode(user.country) };
			});
		}
	});
}

function gcode(country) {
	// Mark locations onto map
	geocoder.geocode( { 'address': country }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
	});
}
