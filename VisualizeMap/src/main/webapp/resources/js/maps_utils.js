/**
 *	Using Library
 *  - Jquery
 *  - d3
 *  - leaflet
 *  - mapbox
 */

    function maps(mapId) {

        this.map = L.map( mapId, {zoomControl: false});
        this.transform = "";
        this.d3path = "";
        this.$w = $(window);
    }

    var mapUtils = {
             map : ""
            ,transform : ""
            ,d3path    : ""
            ,g         : ""
            ,$w        : $(window)
            ,token :"pk.eyJ1IjoiaGFuYmVvbiIsImEiOiJjangxNXd5cDcwNmZvNDNscGZ0NjBhcDd4In0.FRcBjS2p0pn74HLYPZhFxw"
            ,feature : ""
            ,featureProperties : ""
            ,featureUp : ""
            ,featureUpProperties : ""
            ,featureDown : ""
            ,featureDownProperties : ""
            ,gUp :""
            ,gDown :""

            /*
             * Create Default Map ( Leaflet.js )
             */
            ,initMap  : function(mapId){

                this.map = L.map( mapId, {zoomControl: false});

                this.map.fitBounds([
                    [37.569261257943715, 126.90858504619061],
                    [37.56870301447327, 127.03825937252216]
                  ]);

/*				this.map.fitBounds([
                    [40.869693, -74.170267],
                    [40.546460, -73.772013]
                  ]);
*/
                var MAP_ROOT = 'http://{s}.tiles.mapbox.com/v4/zwadia.k5hj7olb';

                  L.tileLayer(MAP_ROOT + '/{z}/{x}/{y}.png?access_token=' + this.token, {
                    maxZoom: 18,
                  }).addTo(this.map);

                L.control.zoom({ position: 'topright' }).addTo(this.map);

                this.transform = d3.geo.transform({ point: this.projectPoint });
                this.d3path = d3.geo.path().projection(this.transform);

                }

            /*
             * Create Group Append
             */
            ,addPathGroup : function(groupId_1, feature_1, groupId_2, feature_2){

                this.feature = feature_1;
                var overlayPane = this.map.getPanes().overlayPane;
                var svg = d3.select(overlayPane)
                .append("svg")
                .attr({
                    'width' : this.$w.width() + 5000,
                    'height': this.$w.height() + 5000,
                    'style' : 'top:-2500px;left:-2500px'
                });

                if ( arguments.length == 2 ) {


                    svg.append("g").attr({
                        "id": groupId_1,
                        "class": "leaflet-zoom-hide",
                        "transform": "translate(2500, 2500)"
                    });

                    this.drawPath(groupId_1, feature_1);

                } else if ( arguments.length == 4 ) {

                    this.featureUp   = feature_1;
                    this.featureDown = feature_2;

                    svg.append("g").attr({
                        "id": groupId_1,
                        "class": "leaflet-zoom-hide",
                        "transform": "translate(2500, 2500)"
                    });

                    svg.append("g").attr({
                        "id": groupId_2,
                        "class": "leaflet-zoom-hide",
                        "transform": "translate(2500, 2500)"
                    });

                    this.drawPath(groupId_1, feature_1, groupId_2, feature_2);
                }
            }

            /*
             * DrawPath on Map
             */

            ,drawPath : function(groupId_1, feature_1, groupId_2, feature_2){

                if ( arguments.length == 2 ) {

                    mapUtils.g = d3.select(document.getElementById(groupId_1));
                    var g = mapUtils.g;
                    $("#"+groupId).children().remove();

                    mapUtils.featureProperties = feature_1.properties;

                    g.append('path')
                     .attr('d', this.d3path(feature_1))
                     .datum(feature_1.properties)
                     .each(this.pathTransition);

                } else if ( arguments.length == 4 ) {


                    mapUtils.gUp = d3.select(document.getElementById(groupId_1));
                    var gUp = mapUtils.gUp;

                    mapUtils.gDown = d3.select(document.getElementById(groupId_2));
                    var gDown = mapUtils.gDown;

                    $("#"+groupId_1).children().remove();
                    $("#"+groupId_2).children().remove();

                    feature_1.properties.nodeClass='NODE_UP_WAY';

                    mapUtils.featureUpProperties = feature_1.properties;

                    gUp.append('path')
                     .attr('d', this.d3path(feature_1))
                     .datum(feature_1.properties)
                     .each(this.pathTransition);

                    feature_2.properties.nodeClass='NODE_DOWN_WAY';

                    mapUtils.featureDownProperties = feature_2.properties;

                    gDown.append('path')
                     .attr('d', this.d3path(feature_2))
                     .datum(feature_2.properties)
                     .each(this.pathTransition);
                }

                this.map.on('viewreset', () => {

                        $("#loading-mask").show();

                        if ( arguments.length == 2 ) {

                            mapUtils.g.selectAll('path').remove();
                            mapUtils.g.selectAll('circle').remove();
                            //mapUtils.drawPath(groupId_1, mapUtils.feature);

                            mapUtils.g.append('path')
                             .attr('d', this.d3path(feature_1))
                             .datum(mapUtils.featureProperties)
                             .each(this.pathTransition);

                        } else if ( arguments.length == 4 ) {

                            mapUtils.gUp.selectAll('path').remove();
                            mapUtils.gUp.selectAll('circle').remove();
                            mapUtils.gDown.selectAll('path').remove();
                            mapUtils.gDown.selectAll('circle').remove();
                            //mapUtils.drawPath(groupId_1, mapUtils.featureUp, groupId_2, mapUtils.featureDown);

                            feature_1.properties.nodeClass='NODE_UP_WAY';
                            gUp.append('path')
                             .attr('d', this.d3path(mapUtils.featureUp))
                             .datum(mapUtils.featureUpProperties)
                             .each(this.pathTransition);

                            feature_2.properties.nodeClass='NODE_DOWN_WAY';
                            gDown.append('path')
                             .attr('d', this.d3path(mapUtils.featureDown))
                             .datum(mapUtils.featureDownProperties)
                             .each(this.pathTransition);
                        }

                        $("#loading-mask").fadeOut();
                    }
                );

            }

            ,pathTransition : function(d){

                var l = this.getTotalLength()
                ,endPoint = this.getPointAtLength(l);
/*
                var marker = mapUtils.g.append('circle')
                .attr({r: 5, cx: endPoint.x, cy: endPoint.y})
                .datum(mapUtils.pointToLatLon(endPoint));

                marker.attr('class', 'TEES')
                .transition()
                .duration(3000)
*/

                //var duration = d.duration;// * 1000/ (60*5000)
                var duration ="777";

                d3.select(this)
                .attr('class', d.nodeClass)
                .transition()
                .duration(duration)
                .each('start', function (d) {
                    this.style.opacity = 1;
                    /*
                    marker.attr('class', 'TEES')
                    .transition()
                    .duration(3000)
                    */
                })
                .each('end', function (d) {
                })
                .attrTween('stroke-dasharray', function () {
                    return d3.interpolateString('0,' + l, l + ',' + l);
                })

            }

            ,projectPoint : function(x,y){
                var map = mapUtils.map;
                var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                this.stream.point(point.x, point.y);
            }

            ,pointToLatLon : function(p){
                return mapUtils.map.layerPointToLatLng(new L.Point(p.x, p.y));
            }

            ,addMarker : function(param){
                param = $.parseJSON(param);
                var busIcon = L.icon({
                    iconUrl: '/resources/img/bus_stop.png',
                    //shadowUrl: '/resources/img/leaf-shadow.png',

                    iconSize:     [40, 40], // size of the icon
                    //shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
                    //shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                $.each( param, (i, item)=> {
                    //L.circleMarker([item.gpslati, item.gpslong]).addTo(this.map);
                    L.marker([item.gpslati, item.gpslong], {icon: busIcon}).addTo(this.map);
                });
            }
            ,removeMarker : function(){
                $(".leaflet-marker-pane").children().remove();
            }
            ,removePath : function(){
                $(".leaflet-overlay-pane").children().remove();
            }

            ,coordinatesAdjustment : function(coordinates, info){

                var newCoords = coordinates.join(';');
                var radius = [];

                coordinates.forEach(item => {
                    radius.push(25);
                });

                var radiuses = radius.join(";");

                var apiUrl ='https://api.mapbox.com/matching/v5/mapbox/'
                           +'driving'+'/'
                           +newCoords+'?geometries=geojson&radiuses='
                           +radiuses+'&steps=true&access_token='
                           +this.token;

                var coords;

                cmmLib.callAsyncAjax(apiUrl, "get", (result)=>{
                    coords = result.matchings[0].geometry.coordinates;
                })

                return coords;

            }

            ,featureFormat : function(params){
                var feature=
                {
                         "type"       : "Feature"
                        ,"properties" : params.properties
                        ,"geometry"   : {
                                             "type"       :"LineString"
                                            ,"coordinates":params.coords
                                        }
                };

                return feature;
            }

        }

