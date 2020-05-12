/**
 *
 */
var map3dFunc={
        /*
         * Coordinate 좌표 지도 양식에 맞춰서 재조립.
         *
         *  == PARAMETERS ==
         *	coordinates        : 좌표 집합                                            : String [] = [[좌표]]
         */
        coordinatesAdjustment : ( coordinates )=>{

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
            console.log("===================================")
            $.ajax({
                url		: apiUrl,
                async	: false,
                beforeSend : function(){
                    $("#loading-mask").show();
                },
                complete:function(){
                    $("#loading-mask").fadeOut();
                },
                success	: function(result){
                    coords = result.matchings[0].geometry.coordinates;
                },
                error	: function(xhr, errMsg) {
                    console.log("ajax error: " , errMsg);
                }
            });
            return coords;


        }

        /*
         * 검색 BUS List 표출.
         *
         * == PARAMETERS ==
         * busNo              : 버스 번호                   :String
         * nodeId             : 정류장 아이디               :String
         */
        ,getBusList : function(busNo, nodeId){

            cmmLib.callAjax("/map/v1/bus/"+busNo, "get", (result)=>{
              console.log( result);
              var searchList = result.resultData;
              var targetNode = $("#"+nodeId);

              var nodeStr = "";

                if ( searchList != "" ) {

                  $.each( searchList, (i,item) => {
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
                  });

                } else {
                  nodeStr = '<tr><td><p class="title"> 조회 된 노선이 없습니다. </p></td></tr>';
                }

                targetNode.html(nodeStr);

              });
        }

        /*
         * 선택한 버스의 정류장 목록 출력
         *
         * == PARAMETERS ==
         * routeId              : 버스 아이디                            :String
         * cityCode             : 도시 코드                              :String
         */
        ,getSelectedBusStopCoordinates : function(routeId, cityCode){

            var coordinateList;

            cmmLib.callAsyncAjax("/map/v1/bus/"+cityCode+"/"+routeId, "get", (result)=>{
                console.log(" ## setSelectedBusStopCoordinates ## ");
                console.log(result);
                var modelCoordinates = new Array();

                if ( result.getBusNodes  ){

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

                    var routeUpWayParam ={
                            "id"            : "routeUpWay"
                            ,"color"        : "#B5B2FF"
                            ,"coordinates"  : map3dFunc.coordinatesAdjustment(upWayCoords)

                          };

                    var routeDownWayParam ={
                             "id"           : "routeDownWay"
                            ,"color"        : "#FFC19E"
                            ,"coordinates"  : map3dFunc.coordinatesAdjustment(downWayCoords)

                          };

                    coordinateList =
                    {
                            "bustStop": modelCoordinates
                           ,"upWay"   : routeUpWayParam
                           ,"downWay" : routeDownWayParam
                    }
                }
            });
            return coordinateList;
        }

        /*
         * 맵 마커 생성
         *
         * == PARAMETERS ==
         * coordinate              : 좌표                                           : String[]
         */

        ,setMarker : function(coordinate){

            if ( markerCoordinate != null )
            {
                $.each(markerCoordinate, function(i,item){
                    var b = new Array();
                    b.push(item[0]);b.push(item[1]);
                    var marker = new mapboxgl.Marker()
                        .setLngLat(b)
                        .remove();
                });
            }

/*
            var marker = new mapboxgl.Marker().addTo(map);
            marker.remove();
*/
            $.each(coordinate, function(i,item){
                var b = new Array();
                b.push(item[0]);b.push(item[1]);
                var marker = new mapboxgl.Marker()
                    .setLngLat(b)
                    .addTo(map);
            })

            markerCoordinate = coordinate

        }

        /*
         * 3D Model 추가.
         *
         *  == PARAMETERS ==
         *	modelCoordinates   : 모델이 추가 될 지도상 좌표 집합.                     :   String [] = [[좌표]]
         *  modelAltitude      : 모델이 지도상에 위치 할 고도                         :   Number
         *  modelRotate        : 모델의 회전                                          : [ Math.PI / ?, ?, ? ];
         */

        ,addModel : function(options ){

            if( map.getLayer(options.modelId) )map.removeLayer(options.modelId);
            if( map.getSource(options.modelId))map.removeSource(options.modelId);

            var modelAltitude = options.modelAltitude == null ? 0                       : options.modelAltitude;
            var modelRotate   = options.modelRotate   == null ? [ Math.PI / 2, 0, 0 ]   : options.modelRotate;

            var modelCoordinates = new Array();

            $.each( options.coordinates, (idx, item)=>{

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
                var THREE = window.THREE;
                var customLayer = {
                        id : options.modelId,
                        type : 'custom',
                        renderingMode : '3d',
                        onAdd : function(map, gl) {
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
                            loader
                                    .load(
                                            options.modelObj,
                                            function(gltf) {
                                                this.scene.add(gltf.scene);
                                            }.bind(this));
                            //this.map = map;

                            // use the Mapbox GL JS map canvas for three.js
                            this.renderer = new THREE.WebGLRenderer({
                                canvas : map.getCanvas(),
                                context : gl,
                                antialias : true
                            });

                            this.renderer.autoClear = false;
                        },
                        render : function(gl, matrix) {

                            $.each( modelCoordinates, (idx, item)=>{
                                if ( idx != 0 )
                                {
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
                                }
                            });
                            map.triggerRepaint();
                        }
                    };

                map.addLayer(customLayer, 'waterway-label');
        }

        /*
         * Route 경로 지도상 표출.
         *
         *  == PARAMETERS ==
         * id                 : route 아이디                                         : String
         * coordinates        : 좌표 집합                                            : String [] = [[좌표]]
         */
        ,drawRoutePath : function ( options ) {

            map.addSource(options.id, {
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

            map.addLayer({
                 'id': options.id
                ,'type': 'line'
                ,'source': options.id
                ,'layout': {
                             'line-join': 'round'
                            ,'line-cap': 'round'
                          }
                ,'paint': {
                             'line-color': options.color
                            ,'line-width': 8
                            }
                });

        }

        /*
         * 버스 실시간 데이터 출력
         *
         *  == PARAMETERS ==
         * cityCode                 : 도시 코드                                         : String
         * routeId                  : 버스 아이디                                       : String
         */
        ,realTimeBusLocation: function(cityCode, routeId){

            webSocketJs.init();
            var param = {"cityCode":cityCode, "routeId":routeId};
            setInterval(()=>{
                console.log("==Call Interval==");
                webSocketJs.sendMessage(JSON.stringify(param));
            },10000);
        }

    }

