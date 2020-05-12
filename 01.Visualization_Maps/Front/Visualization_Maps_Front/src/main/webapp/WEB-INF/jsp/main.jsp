<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<head>
    <meta charset="utf-8" />
    <title>Map 3D model</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link href="/resources/css/loading.css" rel="stylesheet" />
    <link href="/resources/css/other.css" rel="stylesheet" />
    <link href="/resources/css/nucleo-icons.css" rel="stylesheet" />
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
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1.1.4/dist/sockjs.js"></script>
<script src="/resources/js/jquery.min.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/webSocket.js"></script>
<script src="/resources/js/map_3d_func.js"></script>


 <script type="text/javascript">

 var markerCoordinate;
 var ACCESS_TOKEN = "pk.eyJ1IjoiaGFuYmVvbiIsImEiOiJjangxNXd5cDcwNmZvNDNscGZ0NjBhcDd4In0.FRcBjS2p0pn74HLYPZhFxw";

 mapboxgl.accessToken = ACCESS_TOKEN;

var map = (window.map = new mapboxgl.Map({
    container : 'map',
    style : 'mapbox://styles/mapbox/streets-v11',
    zoom : 18,
    center :  [126.747943,37.518464],
    pitch : 60,
    antialias : true
// create the gl context with MSAA antialiasing, so custom layers are antialiased
}));

map.on('load', function() {

    map.addLayer({
            'id'          : '3d-buildings',
            'source'      : 'composite',
            'source-layer': 'building',
            'filter'      : ['==', 'extrude', 'true'],
            'type'        : 'fill-extrusion',
            'minzoom'     : 15,
            'paint'       : {
                                'fill-extrusion-color': '#aaa',
                                'fill-extrusion-height': [
                                    'interpolate',
                                     ['linear'],
                                     ['zoom'],
                                     15,
                                     0,
                                     15.05,
                                     ['get', 'height']
                                ],
            'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                ],
            'fill-extrusion-opacity': 0.6
            }
    })
})

 /* jshint esversion: 6 */

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

            $("#loading-mask").show();

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
                     "coordinates"  :coordinateList.bustStop
                    ,"modelId"      :"busStopModel"
                    ,"modelObj"     :"/resources/AnyConv.com__stationBus.glb"
                }

            map3dFunc.addModel(mapOption);

            map.setCenter(coordinateList.bustStop[0]);

            if ( coordinateList.downWay )
            {
                if ( map.getLayer(coordinateList.downWay.id) ){
                    map.removeLayer(coordinateList.downWay.id);
                }
                if ( map.getSource(coordinateList.downWay.id) ){
                    map.removeSource(coordinateList.downWay.id);
                }

                map3dFunc.drawRoutePath(coordinateList.downWay);
            }

            if ( coordinateList.upWay )
            {
                if ( map.getLayer(coordinateList.upWay.id) ){
                    map.removeLayer(coordinateList.upWay.id);
                }
                if ( map.getSource(coordinateList.upWay.id) ){
                    map.removeSource(coordinateList.upWay.id);
                }

                map3dFunc.drawRoutePath(coordinateList.upWay);

            }


            map3dFunc.realTimeBusLocation(cityCode, tagId);

            /* map.setLayoutProperty("routeUpWay", 'visibility', 'none'); */

            $("#loading-mask").fadeOut();


        });



    })
    </script>