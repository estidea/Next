mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0aWRlYSIsImEiOiJjam5rcGZ0YXExOGloM3FwbTl4amdnMDRxIn0.nY2p2KTw0u-M5kFlfebUhQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/estidea/cjnkqszud0mju2son95xzayef',
    center: [30.657025, 46.304501],
    zoom: 17.0
});

var marker = new mapboxgl.Marker()
  .setLngLat([30.657299, 46.304469])
  .addTo(map);
// create the popup
var popup = new mapboxgl.Popup({ offset: 25 })
    .setText('Пространство NEXT');

// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker';

// create the marker
new mapboxgl.Marker(el)
    .setLngLat([30.657299, 46.304469])
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

$(document).ready(function() {
    $("#preloader-bg").removeClass("preloader-active");
    $(".pong-loader").removeClass("preloader-active");
});