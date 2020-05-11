/**
 *
 */
var ACCESS_TOKEN = "pk.eyJ1IjoiaGFuYmVvbiIsImEiOiJjangxNXd5cDcwNmZvNDNscGZ0NjBhcDd4In0.FRcBjS2p0pn74HLYPZhFxw";
mapboxgl.accessToken = ACCESS_TOKEN;

var MAP_3D;
var THREE = window.THREE;
var map3dFunc=
    {
        /*
         * 3D Map 생성
         *
         * == PARAMETERS ==
         * id            : 지도를 생성 할 태그 아이디
         * coordinate_x  : 초기 지도 중심 좌표 X
         * coordinate_y  : 초기 지도 중심 좌표 Y
         */

        create : function(id, coordinate_x, coordinate_y){
            MAP_3D =
            (window.map = new mapboxgl.Map({
                container : id,
                style : 'mapbox://styles/mapbox/streets-v11',
                zoom : 18,
                center : [ coordinate_x, coordinate_y ],
                pitch : 60,
                antialias : true
            }));
        }

        /*
         * 3D Model 추가.
         *
         *  == PARAMETERS ==
         *	modelCoordinates   : 모델이 추가 될 지도상 좌표 집합.                     :   String [] = [[좌표]]
         *  modelAltitude      : 모델이 지도상에 위치 할 고도                         :   Number
         *  modelRotate        : 모델의 회전                                          : [ Math.PI / ?, ?, ? ];
         */
        ,addModel_3D : function( options , p_map){

            var modelAltitude = !options.modelAltitude ? 0                       : options.modelAltitude;
            var modelRotate   = !options.modelRotate   ? [ Math.PI / 2, 0, 0 ]   : options.modelRotate;

            var modelCoordinates = new Array();

            $.each( options.modelCoordinates, (idx, item)=>{

                var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(item, modelAltitude);
                var modelTransform = {
                            translateX : modelAsMercatorCoordinate.x,
                            translateY : modelAsMercatorCoordinate.y,
                            translateZ : modelAsMercatorCoordinate.z,
                            rotateX : modelRotate[0],
                            rotateY : modelRotate[1],
                            rotateZ : modelRotate[2],
                            scale : modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
                        };
                modelCoordinates.push(modelTransform);
            });


            var modelsLayout =
            {
                 id : '3d-model'
                ,type : 'custom'
                ,renderingMode : '3d'
                ,onAdd : function(map, gl) {
                    this.camera = new THREE.Camera();
                    this.scene = new THREE.Scene();

                    // create two three.js lights to illuminate the model
                    var directionalLight = new THREE.DirectionalLight(0xffffff);
                    directionalLight.position.set(0, -70, 100).normalize();
                    this.scene.add(directionalLight);

                    var directionalLight2 = new THREE.DirectionalLight(0xffffff);
                    directionalLight2.position.set(0, 70, 100).normalize();
                    this.scene.add(directionalLight2);

                    // use the three.js GLTF loader to add the 3D model to the three.js scene
                    var loader = new THREE.GLTFLoader();
                    loader.load(
                                    /*'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',*/
                                    '/resources/AnyConv.com__stationBus.glb',
                                    function(gltf) {
                                        this.scene.add(gltf.scene);
                                    }.bind(this));

                    this.map = p_map;

                    // use the Mapbox GL JS map canvas for three.js
                    this.renderer = new THREE.WebGLRenderer({
                        canvas : map.getCanvas(),
                        context : gl,
                        antialias : true
                    });

                    this.renderer.autoClear = false;
                }
                ,render : function(gl, matrix) {

                    $.each( modelCoordinates, (idx, item)=>{

                        var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), item.rotateX);
                        var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), item.rotateY);
                        var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), item.rotateZ);

                        var m = new THREE.Matrix4().fromArray(matrix);
                        var l = new THREE.Matrix4()
                        .makeTranslation(item.translateX, item.translateY,item.translateZ)
                        .scale(new THREE.Vector3(item.scale,-item.scale, item.scale))
                        .multiply(rotationX)
                        .multiply(rotationY)
                        .multiply(rotationZ);

                        this.camera.projectionMatrix = m.multiply(l);
                        this.renderer.state.reset();
                        this.renderer.render(this.scene, this.camera);
                    });

                    p_map.triggerRepaint();
                }
            }

            p_map.on('style.load', function() {
                p_map.addLayer(modelsLayout, 'waterway-label');
            });
        }
        /*
         * Coordinate 좌표 지도 양식에 맞춰서 재조립.
         *
         *  == PARAMETERS ==
         *	coordinates        : 좌표 집합                                            : String [] = [[좌표]]
         */
        ,coordinatesAdjustment : ( coordinates )=>{

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
                       +ACCESS_TOKEN;

            var coords;

            cmmLib.callAsyncAjax(apiUrl, "get", (result)=>{
                coords = result.matchings[0].geometry.coordinates;
            })

            return coords;
        }

        /*
         * Route 경로 지도상 표출.
         * id                 : route 아이디
         * coordinates        : 좌표 집합                                            : String [] = [[좌표]]
         */
        ,drawRoutePath : function ( options ) {

            this.map.on('load', ()=>{
                MAP_3D.addSource('route', {
                    'type': 'geojson',
                    'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                            'type': 'LineString',
                                            'coordinates': options.coordinates
                                        }
                            }
                    });

                this.map.addLayer({
                     'id': options.id
                    ,'type': 'line'
                    ,'source': 'route'
                    ,'layout': {
                                 'line-join': 'round'
                                ,'line-cap': 'round'
                              }
                    ,'paint': {
                                 'line-color': '#888'
                                ,'line-width': 8
                                }
                    });

            });
        }

        /*
         * 검색 BUS List 표출.
         * busNo              : 버스 번호
         * nodeId             : 정류장 아이디
         */
        ,getBusList : function(busNo, nodeId){

            cmmLib.callAjax("/map/v1/bus/"+busNo, "get", (result)=>{
              console.log( result);
              var searchList = result.resultData;
              var targetNode = $("#"+nodeId);

              targetNode.children().remove();

              var nodeStr = "";

                if ( searchList != "" ) {

                  $.each( searchList, (i,item) => {
                    //"'+item.routeId+'","'+item.cityCode+'"
                    nodeStr += '<tr id="'+item.routeId+'" routeId="'+item.routeId+'" cityCode="'+item.cityCode+'" >'
                            +      '<td>'
                            +       	'<p class="title">'+item.routeTp+'</p>'
                            +      '</td>'
                            +      '<td>'
                            +       	'<p class="title">'+item.routeNo+'</p>'
                            +      '</td>'
                            +      '<td class="td-actions text-right">'
                            +       	'<p class="text-muted">첫차: '+item.startTime+'</p>'
                            +       	'<p class="text-muted">막차: '+item.stopTime+'</p>'
                            +      '<td>'
                            + '</tr>';
                            //+ '<span>'+item.routeTp+'</span>'
                            //+ '<a href="javascript:;" onclick="javascript:getRouteNods(\''+item.cityCode+'\', \''+item.routeId+'\');">'+item.routeNo+'</a>'
                  });

                } else {
                  nodeStr = '<tr><td><p class="title"> 조회 된 노선이 없습니다. </p></td></tr>';
                }

                targetNode.append(nodeStr);

                /*
                 * 검색 결과 테이블 클릭 이벤트
                 */
                $("#busTableTbody tr").on("click", (e)=>{

                    var tagId = e.currentTarget.id;
                    var cityCode = $("#"+tagId).attr("cityCode");

                    this.setSelectedBusStopCoordinates(tagId, cityCode);

                });

              });
        }

        ,setSelectedBusStopCoordinates : function(routeId, cityCode){
            cmmLib.callAjax("/map/v1/bus/"+cityCode+"/"+routeId, "get", (result)=>{
                console.log(" ## setSelectedBusStopCoordinates ## ");
                console.log(result);
                var modelCoordinates = new Array();

                if ( result.getBusNodes.getBusNodes != ""  ){

                    var getBusNodes     = result.getBusNodes.getBusNodes;
                    var getUpWayNodes   = result.getBusNodes.upWayNodes;
                    var getDownWayNodes = result.getBusNodes.downWayNodes;
                    var getDetailInfo   = result.getBusDetailInfo;

                    var upWayCoords = new Array();

                    $.each( getUpWayNodes, (i,item)=>{
                      var y = item.gpslong;
                      var x = item.gpslati;
                      upWayCoords.push([parseFloat(y),parseFloat(x)]);
                    });

                    var downWayCoords = new Array();
                    $.each( getDownWayNodes, (i,item)=>{
                      var y = item.gpslong;
                      var x = item.gpslati;
                      downWayCoords.push([parseFloat(y),parseFloat(x)]);
                    });


                    $.each( getBusNodes, (i,item)=>{
                        var y = item.gpslong;
                        var x = item.gpslati;
                        modelCoordinates.push([parseFloat(y),parseFloat(x)]);
                      });

                    var modelOptions =
                    {
                        modelCoordinates : modelCoordinates
                    }

                    this.addModel_3D(modelOptions);

/*
                    var routeUpWayParam ={
                            "id"       : "route",
                            "coordinates"   : map3dFunc.coordinatesAdjustment(upWayCoords)
                          };


                    var routeDownWayParam ={
                            "id"       : "routeDownWay",
                            "coordinates"    :map3dFunc.coordinatesAdjustment(downWayCoords)
                          };


                    console.log("## routeUpWayParam ## ");
                    console.log( JSON.stringify(routeUpWayParam.coordinates ));

                    map3dFunc.drawRoutePath(routeUpWayParam);*/
                    //map3dFunc.drawRoutePath(routeDownWayParam);

                }

            });
        }
        ,setMarker : function(coordinate){

            $.each(coordinate, function(i,item){
                var b = new Array();
                b.push(item[0]);b.push(item[1]);
                var marker = new mapboxgl.Marker()
                    .setLngLat(b)
                    .addTo(this.map);
            })

        }
    }

