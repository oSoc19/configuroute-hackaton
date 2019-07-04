let route_red = "#d40606";
let route_gray = "#b8b8b8";
let circle_colour = "#3eb1ce";

let scooter_route = {
    "id": "scooter_route",
            "type": "line",
            "source": {
            "type": "geojson",
            "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
            "type": "LineString",
            "coordinates": [
                [4.364383220672607,50.8593752129924],
                [4.363471269607544,50.85802072949449],
                [4.3617868423461905,50.858376285220956],
                [4.3617358803749084,50.85838813703181],
                [4.361690282821655,50.85843893047282],
                [4.360089004039764,50.85868273821946],
                [4.359579384326935,50.85892146540291],
                [4.358970522880554,50.85908061617956],
                [4.357243180274963,50.85945140152038],
                [4.35780107975006,50.860512948726566],
                [4.357259273529053,50.860631461269094],
                [4.3572646379470825,50.86079399226619],
                [4.356510937213898,50.860949750606785]
          ]
        }
      }
    },
    "layout": {
    "line-join": "round",
    "line-cap": "round",
    "visibility": "none"
    },
    "paint": {
    "line-color": route_red,
    "line-width": 8
    }
  };

let walking_route = {
    "id": "walking_route",
            "type": "line",
            "source": {
            "type": "geojson",
            "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
            "type": "LineString",
            "coordinates": [
                [4.364385902881622,50.859378599151846],
                [4.363549053668976,50.85957668905134],
                [4.3628355860710135,50.85973075839137],
                [4.362768530845642,50.85974599599075],
                [4.362272322177887,50.859817104721984],
                [4.362336695194244,50.859957628800544],
                [4.3596383929252625,50.86046554362521],
                [4.359217286109924,50.86055188859518],
                [4.358034431934357,50.860617916993775],
                [4.358004927635192,50.86056204681644],
                [4.357929825782776,50.8605231069563],
                [4.357919096946716,50.860496018338765],
                [4.357892274856567,50.86049093922123],
                [4.3578144907951355,50.86050786961086],
                [4.357227087020874,50.86064161947301],
                [4.357229769229889,50.86080245740677],
                [4.356505572795867,50.860951443629375]
          ]
        }
      }
    },
    "layout": {
    "line-join": "round",
    "line-cap": "round"
    },
    "paint": {
    "line-color": route_red,
    "line-width": 8
    }
  };



window.onload = function(){
    mapboxgl.accessToken = 'pk.eyJ1Ijoid291dGVydmRkIiwiYSI6ImNqczRvbzRlMzA2a2UzeWx4MHlqem1lajYifQ.-kYtzbZnQhJTVeh8zDfgYg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [4.361690282821655,50.85843893047282],
        zoom: 15
    });

    map.on('load', function () {
        map.addLayer(walking_route);
        map.addLayer(scooter_route);
        add_animated_marker(map);
        var marker = new mapboxgl.Marker()
            .setLngLat([4.356510937213898,50.860949750606785])
            .addTo(map);
        var nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');
    });

    $('#calculate-route').on('click', function(){
        map.setPaintProperty('walking_route', 'line-color', route_gray);
        map.setLayoutProperty('scooter_route', 'visibility', 'visible');
    });
};




function add_animated_marker(map){
    var framesPerSecond = 24; 
    var initialOpacity = 1;
    var opacity = initialOpacity;
    var initialRadius = 8;
    var radius = initialRadius;
    var maxRadius = 18;

    // Add a source and layer displaying a point which will be animated in a circle.
    map.addSource('point', {
        "type": "geojson",
        "data": {
            "type": "Point",
            "coordinates": [4.364385902881622,50.859378599151846]
        }
    });

    map.addLayer({
        "id": "point",
        "source": "point",
        "type": "circle",
        "paint": {
            "circle-radius": initialRadius,
            "circle-radius-transition": {duration: 0},
            "circle-opacity-transition": {duration: 0},
            "circle-color": circle_colour
        }
    });

    map.addLayer({
        "id": "point1",
        "source": "point",
        "type": "circle",
        "paint": {
            "circle-radius": initialRadius,
            "circle-color": circle_colour
        }
    });


    function animateMarker(timestamp) {
        setTimeout(function(){
            requestAnimationFrame(animateMarker);

            radius += (maxRadius - radius) / framesPerSecond;
            opacity -= ( 0.9 / framesPerSecond );
            if(opacity <= 0){opacity = 0.0;}
            map.setPaintProperty('point', 'circle-radius', radius);
            map.setPaintProperty('point', 'circle-opacity', opacity);

            if (opacity <= 0) {
                radius = initialRadius;
                opacity = initialOpacity;
            } 

        }, 1000 / framesPerSecond);
        
    }

    // Start the animation.
    animateMarker(0);
}

