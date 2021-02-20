<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="cmm/taglib.jsp" %>
<!-- <link href="/resources/dist/build.css" type="text/css" rel="stylesheet"> -->
<!-- <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css' rel='stylesheet' /> -->


<script src="/resources/js/jquery.min.js"></script>

<head>
<meta charset='utf-8' />
<title>Animate a series of images</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css' type='text/css' />
<style>
body { margin:0; padding:0; }
#map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
  <!-- Create a container for the map -->
  <div id='map'></div>

  <div class="info-box">
    <div id="info">
      <p>Draw your route using the draw tools on the right. To get the most accurate route match, draw points at regular intervals.</p>
    </div>
    <div id="directions"></div>
  </div>

  </body>


  <script>
  $(function(){

    // Add your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuYmVvbiIsImEiOiJjangxNXd5cDcwNmZvNDNscGZ0NjBhcDd4In0.FRcBjS2p0pn74HLYPZhFxw';
    var map = new mapboxgl.Map({
      container: 'map', // Specify the container ID
      style: 'mapbox://styles/mapbox/dark-v10', // Specify which map style to use
      center: [-122.42136449,37.80176523], // Specify the starting position
      zoom: 14.5, // Specify the starting zoom
    });

    var draw = new MapboxDraw({
      // Instead of showing all the draw tools, show only the line string and delete tools
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      styles: [
        // Set the line style for the user-input coordinates
        {
          "id": "gl-draw-line",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#438EE4",
            "line-dasharray": [0.2, 2],
            "line-width": 4,
            "line-opacity": 0.7
          }
        },
        // Style the vertex point halos
        {
          "id": "gl-draw-polygon-and-line-vertex-halo-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 12,
            "circle-color": "#FFF"
          }
        },
        // Style the vertex points
        {
          "id": "gl-draw-polygon-and-line-vertex-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 8,
            "circle-color": "#438EE4",
          }
        },
      ]
    });

    // Add the draw tool to the map
    map.addControl(draw);

    function updateRoute() {
      // Set the profile
      var profile = "driving";
      // Get the coordinates that were drawn on the map
      var data = draw.getAll();
      console.log("DATA"+JSON.stringify(data));
      var lastFeature = data.features.length - 1;
      console.log("lastFeature"+JSON.stringify(data.features.length - 1));
      var coords = data.features[lastFeature].geometry.coordinates;
      //11
/*       coords= [[126.740013,37.489196],
    	  [126.742370,37.489738],
    	  [126.742337,37.491143],
    	  [126.741909,37.493499],
    	  [126.742055,37.495897],
    	  [126.742698,37.497926],
    	  [126.742741,37.500472],
    	  [126.740783,37.500574],
    	  [126.739486,37.500027],
    	  [126.739280,37.498023],
    	  [126.738329,37.497762],
    	  [126.736810,37.496240],
    	  [126.736550,37.493396],
    	  [126.736175,37.491800],
    	  [126.734309,37.489960],
    	  [126.731770,37.490448],
    	  [126.728511,37.491249],
    	  [126.725656,37.491430],
    	  [126.724522,37.492140],
    	  [126.727687,37.494224],
    	  [126.732246,37.493932],
    	  [126.734596,37.493778],
    	  [126.736444,37.493668],
    	  [126.737034,37.496267],
    	  [126.737896,37.497524],
    	  [126.739629,37.498233],
    	  [126.739759,37.500225],
    	  [126.742034,37.500328],
    	  [126.742713,37.498724],
    	  [126.741854,37.496115],
    	  [126.741356,37.493745],
    	  [126.740589,37.492211],
    	  [126.740013,37.489196]]; */
      console.log("coords"+JSON.stringify(coords));
      // Format the coordinates
      var newCoords = coords.join(';')
      // Set the radius for each coordinate pair to 25 meters
      var radius = [];
      coords.forEach(element => {
        radius.push(25);
      });
      console.log("radius " + JSON.stringify(radius));
      getMatch(newCoords, radius, profile);
    }

    // Make a Map Matching request
    function getMatch(coordinates, radius, profile) {
    	console.log("newCoords "+coordinates);
      // Separate the radiuses with semicolons
      coordinates = '126.740013,37.489196;126.742370,37.489738;126.742337,37.491143;126.741909,37.493499;126.742055,37.495897;126.742698,37.497926;126.742741,37.500472;126.740783,37.500574;126.739486,37.500027;126.739280,37.498023;126.738329,37.497762;126.736810,37.496240;126.736550,37.493396;126.736175,37.491800;126.734309,37.489960;126.731770,37.490448;126.728511,37.491249;126.725656,37.491430;126.724522,37.492140;126.727687,37.494224;126.732246,37.493932;126.734596,37.493778;126.736444,37.493668;126.737034,37.496267;126.737896,37.497524;126.739629,37.498233;126.739759,37.500225;126.742034,37.500328;126.742713,37.498724;126.741854,37.496115;126.741356,37.493745;126.740589,37.492211;126.740013,37.489196'
      radius = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25];
      var radiuses = radius.join(';')

      // Create the query
      console.log("radiuses :: " +radiuses);
      var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;
      console.log(query);

      $.ajax({
        method: 'GET',
        url: query
      }).done(function(data) {
        // Get the coordinates from the response
        var coords = data.matchings[0].geometry;
        // Draw the route on the map
        console.log("ajax coords"+ JSON.stringify(coords));
        addRoute(coords);
        getInstructions(data.matchings[0]);

      });
    }

    // Draw the Map Matching route as a new layer on the map
    function addRoute(coords) {
      // If a route is already loaded, remove it
      if (map.getSource('route')) {
        map.removeLayer('route')
        map.removeSource('route')
      } else {
        map.addLayer({
          "id": "route",
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {},
              "geometry": coords
            }
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": "#03AA46",
            "line-width": 8,
            "line-opacity": 0.8
          }
        });
      };
    }

    function getInstructions(data) {
      // Target the sidebar to add the instructions
      var directions = document.getElementById('directions');

      var legs = data.legs;
      var tripDirections = [];
      // Output the instructions for each step of each leg in the response object
      for (var i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        for (var j = 0; j < steps.length; j++) {
          tripDirections.push('<br><li>' + steps[j].maneuver.instruction) + '</li>';
        }
      }
      directions.innerHTML = '<br><h2>Trip duration: ' + Math.floor(data.duration / 60) + ' min.</h2>' + tripDirections;
    }

    // If the user clicks the delete draw button, remove the layer if it exists
    function removeRoute() {
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      } else {
        return;
      }
    }

    map.on('draw.create', updateRoute);
    map.on('draw.update', updateRoute);
    map.on('draw.delete', removeRoute);
  })
  </script>
