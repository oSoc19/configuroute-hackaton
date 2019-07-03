var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

window.onload = function(){
    mapboxgl.accessToken = 'pk.eyJ1Ijoid291dGVydmRkIiwiYSI6ImNqczRvbzRlMzA2a2UzeWx4MHlqem1lajYifQ.-kYtzbZnQhJTVeh8zDfgYg';
    var map = new mapboxgl.Map({
        container: 'right-column',
        style: 'mapbox://styles/mapbox/streets-v11'
    });
};
