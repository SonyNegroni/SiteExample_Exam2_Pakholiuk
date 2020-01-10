// let lat = 40.675594;
// let lng = -73.917363;

let lat = 48.9226;
let lng = 24.7111;
let zoom = 16;
let mymap = L.map('mapid').setView([lat - 0.002, lng + 0.001], zoom);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJva2hvcmVua292YXR2IiwiYSI6ImNrM29wb3U5aDE4dW8zY3Q1bTZwcXRoaGMifQ.srFE8YcwZ2Xj4A_CJ3yuhQ', {
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    scrollWheelZoom: 'center',
    accessToken: 'pk.eyJ1IjoicHJva2hvcmVua292YXR2IiwiYSI6ImNrM29wb3U5aDE4dW8zY3Q1bTZwcXRoaGMifQ.srFE8YcwZ2Xj4A_CJ3yuhQ',

}).addTo(mymap);

mymap.scrollWheelZoom.disable();

let myIcon = L.icon({
    iconUrl: './images/marker.png',
    iconSize: [60, 60],
    popupAnchor: [150, 65]
});

let markerStart = L.marker([lat, lng], { icon: myIcon }).addTo(mymap)
    .bindPopup("<div class='leaflet-popup-content-container'></br><b class='text-uppercase popup-title'>Monticello group hq</b><div id='actions'><a href='#'><i class='fas fa-location-arrow'></i> get directions</a></div>")
    .openPopup();

function locateUser() {
    mymap.removeLayer(markerStart);
    mymap.locate({ setView: true, maxZoom: 18 });
    mymap.on('locationfound', onLocationFound);

    function onLocationFound(e) {
        // create a marker at the users "latlng" and add it to the map
        L.marker(e.latlng).addTo(mymap).bindTooltip("<div class='leaflet-current-location-popup'>You are here</div>").openTooltip();
        L.Routing.control({
            waypoints: [
                L.latLng(e.latlng.lat, e.latlng.lng),
                L.latLng(lat, lng)
            ],
            createMarker: function (i, wp) {
                if (i === 1) {
                    // here change the starting and ending icons
                    return L.marker(wp.latLng, {
                        icon: myIcon // here pass the custom marker icon instance
                    }).bindPopup("<div class='leaflet-popup-content-container'></br></br><b class='text-uppercase popup-title'>Monticello group hq</b></div>").addTo(mymap).bindTooltip("<div class='leaflet-current-location-popup'>We are here</div>").openTooltip();
                }
                // else {
                //     // here change all the others
                //     return L.marker(wp.latLng, {
                //         icon: myIcon
                //     });
                // }
            }
        }).addTo(mymap);
    }
}

$('#actions').find('a').on('click', function (e) {
    e.preventDefault();
    locateUser();
    $('.contacts__frame').css('opacity', 0.3);
});