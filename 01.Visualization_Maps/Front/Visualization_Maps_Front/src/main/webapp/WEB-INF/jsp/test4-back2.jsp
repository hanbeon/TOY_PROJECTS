<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<head>
    <meta charset="utf-8" />
    <title>Add a 3D model</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</body>

<script src="https://unpkg.com/three@0.106.2/build/three.min.js"></script>
<script src="https://unpkg.com/three@0.106.2/examples/js/loaders/GLTFLoader.js"></script>
<script src="/resources/js/jquery.min.js"></script>
<script src="/resources/js/common.js"></script>
<!-- <script src="/resources/js/maps_utils.js"></script> -->
<script src="/resources/js/map_3d_func.js"></script>
<!-- <script src="/resources/js/map_data_func.js"></script> -->


 <script type="text/javascript">


         //map3dFunc.create( map, 126.747943,37.518464);
         /*
        var modelOptions =
            {
                modelCoordinates : [[126.747943,37.518464],[126.743613,37.517080]]
            }

        map3dFunc.addModel_3D(modelOptions);



        var temp = [[126.750707,37.519546],[126.750442,37.518168],[126.747929,37.51831],[126.746825,37.518372],[126.746789,37.516644],[126.743198,37.516909],[126.743202,37.517086],[126.744223,37.518015],[126.742694,37.518141],[126.740451,37.51828],[126.739412,37.518341],[126.73927,37.516654],[126.739059,37.514389],[126.740074,37.512851],[126.738832,37.512215],[126.737341,37.511647],[126.735621,37.51135],[126.733722,37.511425],[126.730665,37.511604],[126.725756,37.51182],[126.72358,37.511877],[126.72355,37.511418],[126.723487,37.510466],[126.725021,37.510401],[126.725992,37.510358],[126.72585,37.508275],[126.72561,37.505523],[126.725512,37.503634],[126.725439,37.50199],[126.725139,37.498896],[126.725092,37.498426],[126.723368,37.498538],[126.72361,37.498288],[126.723043,37.497955],[126.724948,37.495985],[126.726399,37.494498],[126.726099,37.493879],[126.724831,37.49261],[126.723939,37.49138],[126.720577,37.491235],[126.717306,37.491104],[126.712265,37.490918],[126.710876,37.490265],[126.708743,37.487948],[126.7077,37.48662],[126.708337,37.484079],[126.70713,37.487693],[126.705949,37.489672],[126.704835,37.491728],[126.703197,37.494991],[126.702441,37.497261],[126.702744,37.50017],[126.702952,37.502026],[126.703223,37.504338],[126.700603,37.504489],[126.698595,37.50463],[126.696364,37.504786],[126.694045,37.504916],[126.692049,37.504408],[126.690362,37.503199],[126.685649,37.497613],[126.683873,37.496372],[126.686038,37.495469],[126.687566,37.494891]];

        var routePathOptions =
            {
                 id : "route"
                ,coordinates : map3dFunc.coordinatesAdjustment(temp)
            }
        map3dFunc.drawRoutePath(routePathOptions);
        */
/*
        var a = [[126.747943,37.518464],[126.743613,37.517080]];
        $.each(a, function(i,item){
            var b = new Array();
            b.push(item[0]);b.push(item[1]);
            var marker = new mapboxgl.Marker()
                .setLngLat(b)
                .addTo(map);
        })
 */

 /* jshint esversion: 6 */




    $(document).ready(()=>{

        map3dFunc.create( map, 126.747943,37.518464);

        $("#fixedIcon").on("click", function(e){

            var modelCoor = [[126.751146,37.519493],[126.747943,37.518464],[126.743613,37.51708],[126.742701,37.51821],[126.740458,37.51835],[126.739141,37.516662],[126.738923,37.51438],[126.738728,37.512342],[126.737274,37.511786],[126.733733,37.511537],[126.730678,37.511761],[126.725763,37.511981],[126.723485,37.511421],[126.725019,37.510366],[126.725754,37.508279],[126.725518,37.505529],[126.725423,37.503635],[126.725347,37.501994],[126.725042,37.498902],[126.7229,37.497971],[126.724698,37.496108],[126.725994,37.493945],[126.724756,37.492657],[126.720568,37.491362],[126.7173,37.491242],[126.710773,37.490379],[126.708605,37.488007],[126.70781,37.484013],[126.707287,37.487751],[126.706113,37.489736],[126.704984,37.491776],[126.703296,37.495021],[126.702601,37.497266],[126.702921,37.500156],[126.70315,37.502012],[126.700618,37.504626],[126.698607,37.504738],[126.696377,37.504904],[126.691973,37.504511],[126.685545,37.497685],[126.686329,37.495243],[126.687952,37.494845],[126.687952,37.494845],[126.687181,37.495177],[126.685438,37.497263],[126.692335,37.504433],[126.695787,37.504754],[126.697597,37.504619],[126.700237,37.504448],[126.702965,37.503391],[126.702807,37.501904],[126.702547,37.499763],[126.702376,37.498159],[126.703017,37.494978],[126.704769,37.49154],[126.705809,37.48966],[126.706991,37.487667],[126.707892,37.484035],[126.709134,37.488267],[126.712055,37.49075],[126.717402,37.491007],[126.720403,37.491133],[126.724522,37.49214],[126.72499,37.496137],[126.723583,37.49762],[126.725234,37.498826],[126.725436,37.500713],[126.725633,37.503602],[126.72574,37.505615],[126.725964,37.508286],[126.725568,37.510449],[126.723797,37.510541],[126.723659,37.511476],[126.725339,37.511731],[126.729605,37.511549],[126.733992,37.511229],[126.739158,37.512158],[126.739405,37.515722],[126.740122,37.517079],[126.742428,37.516917],[126.745086,37.516704],[126.747007,37.517325],[126.748138,37.518261]]
            var modelOptions =
            {
                modelCoordinates : modelCoor
            }
            map3dFunc.addModel_3D(modelOptions);
            map3dFunc.setMarker(modelOptions.modelCoordinates);


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
            /* map3dFunc.getBusList($searchBusNo, "busTableTbody"); */

            cmmLib.callAjax("/map/v1/bus/"+$searchBusNo, "get", (result)=>{
                console.log( result);
                var searchList = result.resultData;
                var targetNode = $("#busTableTbody");

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

                      //setSelectedBusStopCoordinates(tagId, cityCode);
/*
                      var coordinates = map3dFunc.getSelectedBusStopCoordinates(tagId, cityCode);
                      console.log("-- coordinates -- ");
                      console.log(coordinates);

                      var modelOptions =
                      {
                          modelCoordinates : coordinates
                      } */

                      //map3dFunc.addModel_3D(modelOptions);

                  });

                });

        });

    })
    </script>