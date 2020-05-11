<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<head>
    <meta charset="utf-8" />
    <title>Add a 3D model</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link href="/resources/css/loading.css" rel="stylesheet" />
    <link href="/resources/css/other.css" rel="stylesheet" />
    <link href="/resources/css/nucleo-icons.css" rel="stylesheet" />
    <!-- <link href="/resources/dist/build.css" rel="stylesheet" /> -->
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css" rel="stylesheet" />
        <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }



        .table_list::-webkit-scrollbar {
            width: 10px;
          }

        .table_list::-webkit-scrollbar-thumb {
            background-color: #2f3542;
            border-radius: 10px;
            background-clip: padding-box;
            border: 2px solid transparent;
          }

        .table_list::-webkit-scrollbar-track {
            background-color: grey;
            border-radius: 10px;
            box-shadow: inset 0px 0px 5px white;
          }

        </style>
</head>
<body>
    <div id="map"></div>
    <div class="fixed-plugin" >
            <div class="dropdown show-dropdown" id="fixedDiv">
                <div>
                    <i class="fa fa-cog fa-2x" id="fixedIcon"></i>
                </div>
                <!-- <div class="dropdown-menu show"	style="overflow-y: scroll; overflow-x: hidden;" id="fixedContent"> -->
                <div class="dropdown-menu show"	 id="fixedContent">
                    <div class="row">
                        <input placeholder="Bus Route" id="searchId" type="text" class="form-control" value="">
                    </div>
                    <div class="row">
                        <button class="btn-round btn btn-Info btn-block" id="btnBusSearch">Bus Search</button>
                    </div>
                    <div class="row table_list" style="overflow-y:auto; height: 300px" >
                        <table class="table">
                            <tbody id="busTableTbody">
                                <tr>
                                    <td>
                                        <p class="title">검색 결과창</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="loading-mask"></div>
</body>

<script src="https://unpkg.com/three@0.106.2/build/three.min.js"></script>
<script src="https://unpkg.com/three@0.106.2/examples/js/loaders/GLTFLoader.js"></script>
<script src="/resources/js/jquery.min.js"></script>
<script src="/resources/js/common.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1.1.4/dist/sockjs.js"></script>
<script src="/resources/js/webSocket.js"></script>

<!-- <script src="/resources/js/maps_utils.js"></script> -->
<script src="/resources/js/map_3d_func.js"></script>
<!-- <script src="/resources/js/map_data_func.js"></script> -->


 <script type="text/javascript">

 var ACCESS_TOKEN = "pk.eyJ1IjoiaGFuYmVvbiIsImEiOiJjangxNXd5cDcwNmZvNDNscGZ0NjBhcDd4In0.FRcBjS2p0pn74HLYPZhFxw";
   /* var ACCESS_TOKEN = "pk.eyJ1IjoiampzNDE0MSIsImEiOiJja2ExNGdybjIwNzB5M2ZtbjB2b2tha21iIn0.Njr7D-4CR6jg8ir-4jWpvA"; */

 mapboxgl.accessToken = ACCESS_TOKEN;

var map = (window.map = new mapboxgl.Map({
    container : 'map',
    style : 'mapbox://styles/mapbox/streets-v11',
    //style: 'mapbox://styles/mapbox/light-v10',
    zoom : 18,
    center :  [126.747943,37.518464],
    pitch : 60,
    antialias : true
// create the gl context with MSAA antialiasing, so custom layers are antialiased
}));

 /* jshint esversion: 6 */

 var func_map=
     {
         addModel : function(options ){

            var modelAltitude = options.modelAltitude == null ? 0                       : options.modelAltitude;
            var modelRotate   = options.modelRotate   == null ? [ Math.PI / 2, 0, 0 ]   : options.modelRotate;

            var modelCoordinates = new Array();

            $.each( options.busStop, (idx, item)=>{

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
                                            '/resources/AnyConv.com__stationBus.glb',
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
         * id                 : route 아이디
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

        ,realTimeBusLocation: function(cityCode, routeId){

            webSocketJs.init();
            var param = {"cityCode":cityCode, "routeId":routeId};
            setInterval(()=>{
                console.log("==Call Interval==");
                webSocketJs.sendMessage(JSON.stringify(param));
            },10000);
        }
     }
/*     function create_map(options){

        map = (window.map = new mapboxgl.Map({
            container : 'map',
            style : 'mapbox://styles/mapbox/streets-v11',
            //style: 'mapbox://styles/mapbox/light-v10',
            zoom : 18,
            center :  options.busStop  != null ? options.busStop[0] : [ 126.747943,37.518464 ],
            pitch : 60,
            antialias : true
        // create the gl context with MSAA antialiasing, so custom layers are antialiased
        }));
        console.log(options);

        if ( options.way != null ){
            console.log(" OPTIONS :: ");
            console.log(options.way);
            $.each(options.way, (idx, item)=>{

                 map.on('load', function() {
                     map.addSource(item.id, {
                         'type': 'geojson',
                         'data': {
                             'type': 'Feature',
                             'properties': {},
                             'geometry': {
                                 'type': 'LineString',
                                 'coordinates': item.coordinates
                                 }
                         }
                     });
                     map.addLayer({
                         'id': item.id,
                         'type': 'line',
                         'source': item.id,
                         'layout': {
                             'line-join': 'round',
                             'line-cap': 'round'
                             },
                         'paint': {
                             'line-color': item.color,
                             'line-width': 8
                             }
                         });
                     });
            });
        }
     }

 */

    $(document).ready(()=>{

        $("#fixedIcon").on("click", function(e){

            if ( !$("#fixedDiv").hasClass("show") ){
                $("#fixedDiv").addClass("show");
            }else{
                $("#fixedDiv").removeClass("show");
            }
        });


        /*
         * BUS 검색 버튼 클릭 이벤트
         */
        $("#btnBusSearch").on("click", ()=>{

            var $searchBusNo = $("#searchId").val();
            map3dFunc.getBusList($searchBusNo, "busTableTbody");

        });

        /*
         * 검색 결과 테이블 클릭 이벤트
         */
        $(document).on("click","#busTableTbody tr", (e)=>{

            var tagId = e.currentTarget.id;
            var cityCode = $("#"+tagId).attr("cityCode");

            var coordinateList = map3dFunc.getSelectedBusStopCoordinates(tagId, cityCode);
            console.log(coordinateList);

            if ( map.getLayer("busStopModel") ){
                map.removeLayer("busStopModel");
            }

            if ( map.getSource("busStopModel") ){
                map.removeSource("busStopModel");
            }

            var mapOption=
                {
                     "busStop":coordinateList.bustStop
                    ,"modelId":"busStopModel"
                    /* ,"way": [coordinateList.downWay,coordinateList.upWay] */
                }

            func_map.addModel(mapOption);

            if ( coordinateList.downWay )
            {
                if ( map.getLayer(coordinateList.downWay.id) ){
                    map.removeLayer(coordinateList.downWay.id);
                }
                if ( map.getSource(coordinateList.downWay.id) ){
                    map.removeSource(coordinateList.downWay.id);
                }

                func_map.drawRoutePath(coordinateList.downWay);
            }

            if ( coordinateList.upWay )
            {
                if ( map.getLayer(coordinateList.upWay.id) ){
                    map.removeLayer(coordinateList.upWay.id);
                }
                if ( map.getSource(coordinateList.upWay.id) ){
                    map.removeSource(coordinateList.upWay.id);
                }

                func_map.drawRoutePath(coordinateList.upWay);

            }


            func_map.realTimeBusLocation(cityCode, tagId);

            /* map.setLayoutProperty("routeUpWay", 'visibility', 'none'); */


        });



    })
    </script>