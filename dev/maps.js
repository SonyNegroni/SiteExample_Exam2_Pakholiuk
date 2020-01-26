let lat = 49.2331;
let lng = 28.4682;
let zoom = 16;
let mymap = L.map('mapid').setView([lat - 0.002, lng + 0.001], zoom);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1Ijoic29uaWN5b3V0aDIxIiwiYSI6ImNrNG9tdHRwMzA3bDczbHJ4azkwYmtsN2gifQ.Ej7YzGqsFsGU8RtzEONcUg'

}).addTo(mymap);

mymap.scrollWheelZoom.disable();
