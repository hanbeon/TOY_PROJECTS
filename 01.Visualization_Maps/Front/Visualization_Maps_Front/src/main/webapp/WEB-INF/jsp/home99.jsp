<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<link href="/resources/dist/build.css" type="text/css" rel="stylesheet">

<!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css"> -->

<script src="/resources/js/jquery.min.js"></script>
<script src="/resources/js/leaflet.js"></script>
<script src="/resources/js/per_date.js"></script>
<script src="/resources/js/underscore-min.js"></script>
<script src="/resources/js/moment.min.js"></script>
<script src="/resources/js/polyline.js"></script>

<head>
  <title>NYC flight-taxi visualization</title>

  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">

  <link href="dist/build.css" type="text/css" rel="stylesheet">
</head>
<body>
  <div id="map"></div>
<!--
  <div class="container overlay">
    <div class="innerlay">
      <h3>Welcome to the NYC Taxi Holiday Visualization!</h3>
      <p>We used 2013 NYC Taxi data to visualize traffic from JFK and LGA
        airports during the holiday season (Nov 15th to December 31st).</p>
      <p>Observe the traffic patterns and refine the visualization to include
        your favorite airlines or terminals.</p>
      <p>Enjoy!</p>
      <p><a id="begin" class="btn btn-primary" role="button">
          <i class="glyphicon glyphicon-flight"></i>Begin</a></p>
    </div>
  </div>
 -->
  <div class="datetime-box box">
    <div class="date">Wednesday, Nov 15</div>
    <div class="time">00:00 am</div>
    <div class= "controls">
      <button class="btn btn-default speed slower">
        <i class="glyphicon glyphicon-backward"></i> Slower
      </button>
      <div class="time-factor">
        <span>30</span> min/s
      </div>
      <button class="btn btn-default speed faster">
        Faster <i class="glyphicon glyphicon-forward"></i>
      </button>
    </div>
  </div>

  <form id="form" method="GET" action="" class="filters box">
    <div class="terminals">
      <h4 class="box-heading">Terminals <span class="right-head">Taxi trips</span></h4>
      <div class="checkbox">
        <label><input type="checkbox" value="JFKT1">JFK T1</label>
        <span class="tcount" id="count-JFKT1">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="JFKT23">JFK T23</label>
        <span class="tcount" id="count-JFKT23">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="JFKT4">JFK T4</label>
        <span class="tcount" id="count-JFKT4">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="JFKT5">JFK T5</label>
        <span class="tcount" id="count-JFKT5">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="JFKT7">JFK T7</label>
        <span class="tcount" id="count-JFKT7">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="JFKT8">JFK T8</label>
        <span class="tcount" id="count-JFKT8">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="LGAA">LGA A</label>
        <span class="tcount" id="count-LGAA">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="LGAB">LGA B</label>
        <span class="tcount" id="count-LGAB">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="LGAC">LGA C</label>
        <span class="tcount" id="count-LGAC">0</span>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" value="LGAD">LGA D</label>
        <span class="tcount" id="count-LGAD">0</span>
      </div>

      <div class="legends clearfix">
        <span class="jfk"><i class="glyphicon glyphicon-plane"></i>JFK</span>
        <span class="lga"><i class="glyphicon glyphicon-plane"></i>LGA</span>
      </div>
    </div>

    <div class="hide">
      <h4 class="box-heading">Date range</h4>
      <div class="input-daterange input-group">
        <input type="text" class="form-control" id="startDate" value="2013-11-15" />
          <span class="input-group-addon">..</span>
        <input type="text" class="form-control" id="endDate" value="2013-12-31" />
      </div>

      <br>
      <input type="submit" class="btn btn-default submit" value="Update">
    </div>

  </form>

  <div class="airlines box">
    <h4 class="box-heading">Airlines</h4>
    <div class="t-JFKT1">
      <div>
        Aero Mexico<br> Aeroflot<br> Air China<br> Air France<br> Alitalia<br>
        Austrian Airlines<br> Brussels Airlines<br> Cayman Airways<br> China Eastern<br>
        EVA Airways<br> Fly Jamaica Airways<br>
      </div>
      <div>
        Interjet<br> Japan Airlines<br>
        Korean Air<br> LOT<br> Lufthansa<br> Meridiana<br> Norwegian Air Shuttle<br>
        Royal Air Maroc<br> Saudi Arabian Airlines<br> TAME<br> Turkish
      </div>
    </div>
    <div class="t-JFKT23">
      Delta(Domestic)
    </div>
    <div class="t-JFKT4">
      <div>
        Air Europa<br> Air India<br> Air Jamaica<br> Arik Air<br> Asiana<br> Avianca<br>
        Caribbean<br> China Airlines<br> China Southern<br> Copa Airlines<br> Czech Airlines<br>
        Delta(International, LAX, SFO, SEA)<br> Egyptair<br> El Al<br> Emirates<br> Etihad<br>
      </div>
      <div>
        Jet Airways<br> JetBlue<br> KLM Royal Dutch Airlines<br> Kuwait Airways<br>
        Miami Air (charter)+<br> North American<br> Pakistan International Airlines<br>
        Singapore Airlines<br> South African Airways<br> Sun Country<br> SWISS<br>
        Transaero Airlines <br> Uzbekistan<br> Virgin America<br> Virgin Atlantic<br> XL Airways
      </div>
    </div>
    <div class="t-JFKT5">
      Aer Lingus<br> Hawaiian Airlines<br>
      JetBlue Aruba, Bermuda, Nassau, Bahamas and Puerto Rico
    </div>
    <div class="t-JFKT7">
      Aerolineas Argentinas<br> Air Canada<br> ANA (All Nippon)<br> British Airways<br>
      Cathay Pacific<br> Iberia<br> Icelandair<br> OpenSkies<br> Qantas<br>
      Ukraine International Airlines<br> United Airlines<br> WestJet
    </div>
    <div class="t-JFKT8">
      Air Berlin<br> American<br> American Eagle<br> Finnair<br> Lan Chile<br>
      Lan Ecuador<br> Lan Peru<br> Qatar Airways<br> Royal Jordanian<br> TAM<br> US Airways
    </div>

    <div class="t-LGAA">
      Air Canada<br> Alaska Airlines<br> American<br> American Eagle<br> JetBlue<br>
      Southwest<br> United Express<br> US Airways<br> US Airways Express<br>
      Virgin America<br> Delta Shuttle<br>
    </div>
    <div class="t-LGAB">
      <div>
        Air India<br> Austrian Airlines<br> Avianca<br> Bahamasair<br> British Airways<br>
        Cathay Pacific<br> Delta<br> El Al<br> Icelandair<br> Jet Airways<br>
      </div>
      <div>
        La Compagnie<br> Lufthansa<br> OpenSkies<br> PEOPLExpress<br> Porter Airlines<br>
        SAS<br> Swiss<br> TAP Portugal<br> Virgin Atlantic<br>
      </div>
    </div>
    <div class="t-LGAC">
      United
    </div>
    <div class="t-LGAD">
      Delta<br> Delta Connection
    </div>
    <div class="t-EWRA">
      Delta Shuttle
    </div>
    <div class="t-EWRB">
      Air Canada<br> Air Tran Airways<br> Frontier Airlines<br> Southwest Airlines<br>
      Spirit<br> American Eagle<br> American Airlines<br> JetBlue Airways<br> United<br>
      United Express<br>
    </div>
    <div class="t-EWRC">
      US Airways<br> US Airways Express<br> US Airways Shuttle<br> WestJet<br>
    </div>
  </div>

  <div class="graph box">
    <h4 class="graph-heading">Daily stats</h4>
    <div class="graph-left">trips</div>
    <div class="graph-tip"></div>
    <div class="chart-box">
      <svg class="chart"></svg>
    </div>
  </div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="/resources/js/d3.v3.min.js"></script>
  <!-- <script src="/resources/dist/build.js"></script> -->
  <!-- <script src="/resources/js/main.js"></script> -->

  <script>

  function start(){
  	  var map, transform, d3path, $w = $(window);

    	function projectPoint (x, y) {

    	  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    	  this.stream.point(point.x, point.y);
    	}

    	function pointToLatLon(p) {
    		  return map.layerPointToLatLng(new L.Point(p.x, p.y));
    		}

    	  /*
    	   *  Create Maps
    	   */

    	  map = L.map('map', {zoomControl: false});

    	  map.fitBounds([
    	    [40.869693, -74.170267],
    	    [40.546460, -73.772013]
    	  ]);

    	  var MAP_ROOT = 'http://{s}.tiles.mapbox.com/v4/zwadia.k5hj7olb'
    	    , TOKEN = 'pk.eyJ1IjoiendhZGlhIiwiYSI6InlYbnFfUFEifQ.G5od28q6cCQhxrQGKSg1kg';

    	  L.tileLayer(MAP_ROOT + '/{z}/{x}/{y}.png?access_token=' + TOKEN, {
    	    attribution: (
    	      'Maps from <a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> | ' +
    	      '<span>Directions Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>' +
    	      ' | © OpenStreetMap contributors'
    	    ),
    	    maxZoom: 18,
    	  }).addTo(map);

    	  L.control.zoom({ position: 'topright' }).addTo(map);
    	  /***************************/

    	  /* SVG*/
    	  transform = d3.geo.transform({ point: projectPoint });
        d3path = d3.geo.path().projection(transform);
        /**/

        /* Create Group */
        var overlayPane = map.getPanes().overlayPane;
        var svg = d3.select(overlayPane)
          .append("svg")
          .attr({
            'width': $w.width() + 5000,
            'height': $w.height() + 5000,
            'style': 'top:-2500px;left:-2500px'
          });

        svg.append("g").attr({
          "id": "testId",
          "class": "leaflet-zoom-hide",
          "transform": "translate(2500, 2500)"
        });
  	/********/
	setInterval(aa, 3000);

  	/* Create Path */
  	/* var b = [[-73.78256,40.64454],[-73.78172,40.64475],[-73.78087,40.64509],[-73.78063,40.64515],[-73.78028,40.64537],[-73.78021,40.64563],[-73.78034,40.64588],[-73.78088,40.64648],[-73.78144,40.64669],[-73.78229,40.64683],[-73.78277,40.64675],[-73.78536,40.64562],[-73.78645,40.64517],[-73.78712,40.64501],[-73.7883,40.64496],[-73.79135,40.64493],[-73.79476,40.6447],[-73.79572,40.64466],[-73.79673,40.6447],[-73.79764,40.64483],[-73.79828,40.64498],[-73.79925,40.64531],[-73.80023,40.6458],[-73.80104,40.64636],[-73.80177,40.64701],[-73.80314,40.64837],[-73.80479,40.6503],[-73.80577,40.65166],[-73.80657,40.65294],[-73.80702,40.65396],[-73.8073,40.65502],[-73.80738,40.65636],[-73.80728,40.65722],[-73.80703,40.6582],[-73.8067,40.659],[-73.80628,40.65976],[-73.80569,40.66057],[-73.8052,40.66106],[-73.80454,40.66146],[-73.80372,40.66177],[-73.80315,40.66208],[-73.80265,40.66251],[-73.80227,40.66315],[-73.8021,40.66363],[-73.80191,40.66516],[-73.80168,40.66603],[-73.80152,40.66656],[-73.80131,40.66693],[-73.80124,40.66711],[-73.8011,40.66733],[-73.80084,40.66746],[-73.80053,40.66742],[-73.80032,40.66725],[-73.8003,40.667],[-73.80046,40.66681],[-73.80117,40.6667],[-73.80429,40.66685],[-73.80545,40.66691],[-73.81032,40.66709],[-73.81039,40.66688],[-73.81056,40.66634],[-73.80863,40.66627],[-73.8076,40.66623],[-73.80674,40.66619]];
  	for( var i = 0; i < b.length; i ++ ) {
  		setInterval(aa( b.slice(0, i+1 ) ), 50000);
  	} */
  	function aa(p){

        var g = d3.select(document.getElementById("testId"));
        $("#testId").children().remove();
        //g.remove();

        /* _.each(features, function (feature) { */
        var feature= {
        		 "type":"Feature"
        		,"properties":{
        			 "batchStart":"20131115000100"
        			,"terminal":"JFKT4"
        			,"duration":"777"
        			,"pickupTime":"2013-11-15 00:38:00"
        			}
        		,"geometry":{
        			 "type":"LineString"
        			 ,"coordinates":[[-73.78256,40.64454],[-73.78172,40.64475],[-73.78087,40.64509],[-73.78063,40.64515],[-73.78028,40.64537],[-73.78021,40.64563],[-73.78034,40.64588],[-73.78088,40.64648],[-73.78144,40.64669],[-73.78229,40.64683],[-73.78277,40.64675],[-73.78536,40.64562],[-73.78645,40.64517],[-73.78712,40.64501],[-73.7883,40.64496],[-73.79135,40.64493],[-73.79476,40.6447],[-73.79572,40.64466],[-73.79673,40.6447],[-73.79764,40.64483],[-73.79828,40.64498],[-73.79925,40.64531],[-73.80023,40.6458],[-73.80104,40.64636],[-73.80177,40.64701],[-73.80314,40.64837],[-73.80479,40.6503],[-73.80577,40.65166],[-73.80657,40.65294],[-73.80702,40.65396],[-73.8073,40.65502],[-73.80738,40.65636],[-73.80728,40.65722],[-73.80703,40.6582],[-73.8067,40.659],[-73.80628,40.65976],[-73.80569,40.66057],[-73.8052,40.66106],[-73.80454,40.66146],[-73.80372,40.66177],[-73.80315,40.66208],[-73.80265,40.66251],[-73.80227,40.66315],[-73.8021,40.66363],[-73.80191,40.66516],[-73.80168,40.66603],[-73.80152,40.66656],[-73.80131,40.66693],[-73.80124,40.66711],[-73.8011,40.66733],[-73.80084,40.66746],[-73.80053,40.66742],[-73.80032,40.66725],[-73.8003,40.667],[-73.80046,40.66681],[-73.80117,40.6667],[-73.80429,40.66685],[-73.80545,40.66691],[-73.81032,40.66709],[-73.81039,40.66688],[-73.81056,40.66634],[-73.80863,40.66627],[-73.8076,40.66623],[-73.80674,40.66619]]
        			/* ,"coordinates":p */
        			}
        		};

          /* feature.geometry.coordinates = polyline.decode(
            feature.geometry.coordinates); */
            	g.append('path')
                .attr('d', d3path(feature))
                .datum(feature.properties)
                .each(pathTransition);


            function pathTransition (d) {

            	var l = this.getTotalLength()
                , endPoint = this.getPointAtLength(l);

            	var marker = g.append('circle')
                .attr({r: 2, cx: endPoint.x, cy: endPoint.y})
                .datum(pointToLatLon(endPoint));


          	  var duration = d.duration;// * 1000/ (60*5000)

          	  d3.select(this)
                .attr('class', d.terminal)
                .transition()
                .duration(duration)
                .each('start', function (d) {
                  this.style.opacity = 1;
                })
    	        .each('end', function (d) {
    	          /* updateCounts(d.terminal); */
/*
    	          marker.attr('class', d.terminal)
    	            .transition()
    	            .duration(3000)
    	            .style('opacity', 0)
    	            .remove();

    	          d3.select(this)
    	            .transition()
    	            .duration(500)
    	            .style('opacity', 0)
    	            .remove();
 */
    	        })
    	        .attrTween('stroke-dasharray', function () {
    	            return d3.interpolateString('0,' + l, l + ',' + l);
    	        })
    /*
                  map.on('viewreset', onViewReset);

    			  function onViewReset () {
    			    g.selectAll('path').remove();
    			    g.selectAll('circle').remove();
    			  } */
            }


            map.on('viewreset', onViewReset);

            function onViewReset () {
              g.selectAll('path').remove();
              g.selectAll('circle').remove();
            }
        /* }); */
  	}


  }
  	$(function(){

		start();
  	})
  </script>
</body>
</html>
