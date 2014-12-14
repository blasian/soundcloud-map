var map;
var marker;
var geocoder;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: { lat: 0, lng: 0},
        zoom: 3,
        disableDefaultUI: true
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

function updateMap() {
    var address = document.getElementById("address").value;
    geocoder.geocode( {'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocoder was unsuccessful.. probably because you suck");
        }
    });
}
