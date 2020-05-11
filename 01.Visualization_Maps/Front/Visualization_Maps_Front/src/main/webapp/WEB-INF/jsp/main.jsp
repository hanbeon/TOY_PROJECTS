<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="cmm/taglib.jsp" %>
<link href="/resources/dist/build.css" type="text/css" rel="stylesheet">

<!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css"> -->

<script src="/resources/js/jquery.min.js"></script>
<script src="/resources/js/common.js"></script>
<head>
  <title>NYC flight-taxi visualization</title>

  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">

  <link href="dist/build.css" type="text/css" rel="stylesheet">
  <style type="text/css">

    .tab {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    /* Float the list items side by side */
    .tab li {
        float: left;
        width: 50%;
        background-color: rgba(255, 255, 255, 0.27);
    }
    /* Style the links inside the list items */
    .tab li a {
        display: inline-block;
        color: #000;
        text-align: center;
        text-decoration: none;
        padding: 14px 16px;
        font-size: 17px;
        transition:0.3s;
    }
    /* Style the tab content */
    .tabcontent {
        display: none;
        /* background-color:rgb(0,154,200); */
        padding: 6px 12px;
        color:#fff;
    }
    ul.tab li.active{
        background-color: rgba(163, 255, 175, 0.44);
        color: #222;
    }
    .tabcontent.active {
        display: block;
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <div class="filters box-details">
    <details>
      <summary>BUS Regions - 더 보기</summary><hr>
      <div class="terminals">
          <h4 class="box-heading">Regions<span class="right-head">bus</span></h4>
          <c:if test="${ fn:length( cityList ) > 0}" >
             <c:forEach var="city" items="${cityList}">
               <c:if test="${city.cityCode eq 23}">
                  <div class="checkbox">
                     <label><input type="checkbox" value="${city.cityCode}">${city.cityName}</label>
                   </div>
               </c:if>
            </c:forEach>
          </c:if>
      </div>
    </details>
  </div>

  <div class="filters box-details">
    <details>
      <summary>BUS Search</summary><hr>
      <div class="terminals">
          <h4 class="box-heading">버스 검색<span class="right-head">bus</span></h4>
          <input id="searchId" class="input-search" type="text"><button id="btnBusSearch">검색</button>
      </div>
    </details>
  </div>

  <div class="filters box-details">
    <details>
      <summary id="searchBusListSummary">BUS 목록</summary><hr>
      <div class="terminals">
        <div id="searchBusList" class="search-list">
          <p>조회 된 노선이 없습니다.</p>
        </div>
      </div>
    </details>
  </div>

  <div class="filters box-details">
    <details>
      <summary id="searchBusStopListSummary">정류장 목록</summary><hr>
      <div class="terminals">
        <div id="searchBusStopList" class="search-list">
          <!-- <p>선택 된 노선이 없습니다.</p> -->
            <ul class="tab">
                <li class="active" data-tab="bus_stop_up_tab"><a href="#">상행</a></li>
                <li data-tab="bus_stop_down_tab"><a href="#">하행</a></li>
            </ul>
            <hr>
            <div id="bus_stop_up_tab" class="tabcontent active">
                <p>선택 된 노선이 없습니다.</p>
            </div>
            <div id="bus_stop_down_tab" class="tabcontent">
                <p>선택 된 노선이 없습니다.</p>
            </div>
        </div>
      </div>
    </details>
  </div>

  <div id="loading-mask"></div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="/resources/js/d3.v3.min.js"></script>
  <script src="/resources/js/leaflet.js"></script>
  <script src="/resources/js/maps_utils.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1.1.4/dist/sockjs.js"></script>
  <script src="/resources/js/webSocket.js"></script>
  <!-- <script src="/resources/dist/build.js"></script> -->
  <!-- <script src="/resources/js/main.js"></script> -->

  <script>

    $(function(){

        $('ul.tab li').click(function() {
            var activeTab = $(this).attr('data-tab');
            $('ul.tab li').removeClass('active');
            $('.tabcontent').removeClass('active');
            $(this).addClass('active');
            $('#' + activeTab).addClass('active');
        })


      mapUtils.initMap("map");
      //mapUtils.addPathGroup("testId");
      //webSocketJs.init();


      $("#btnBusSearch").on("click", function(){
      var searchId = $("#searchId").val();

        cmmLib.callAjax("/map/v1/bus/"+searchId, "get", (result)=>{

          var searchList = result.resultData;
        var targetNode = $("#searchBusList");

        targetNode.children().remove();

        var nodeStr = "";

          if ( searchList != "" ) {

            $.each( searchList, (i,item) => {
              //"'+item.routeId+'","'+item.cityCode+'"
              nodeStr += '<div class="search-row">';
              nodeStr += '<span>'+item.routeTp+'</span>'
              nodeStr += '<a href="javascript:;" onclick="javascript:getRouteNods(\''+item.cityCode+'\', \''+item.routeId+'\');">'+item.routeNo+'</a>'
              nodeStr += '</div>'
            });

          } else {
            nodeStr = "<p>조회 된 노선이 없습니다.</p>";
          }

          targetNode.append(nodeStr);

        });

        if ( $("#searchBusListSummary").parent().attr("open") !="open" ) {
          $("#searchBusListSummary").parent().attr("open",true);
        }
      });

    });

    function getRouteNods(cityCode, routeId){

      cmmLib.callAjax("/map/v1/bus/"+cityCode+"/"+routeId, "get", (result)=>{

        if ( result.getBusNodes.getBusNodes != "") {

          mapUtils.removeMarker();
          mapUtils.removePath();

        var getBusNodes = result.getBusNodes.getBusNodes;
        var getUpWayNodes = result.getBusNodes.upWayNodes;
        var getDownWayNodes = result.getBusNodes.downWayNodes;
        var getDetailInfo = result.getBusDetailInfo;


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

         //mapUtils.addMarker(getBusNodes);

        var featureUpWayParam ={
                    "properties": getDetailInfo,
                    "coords"    :mapUtils.coordinatesAdjustment(upWayCoords)
                  };

        var formatFeatureUpWay = mapUtils.featureFormat(featureUpWayParam);

        var featureDownWayParam ={
                    "properties": getDetailInfo,
                    "coords"    :mapUtils.coordinatesAdjustment(downWayCoords)
                  };

        var formatFeatureDownWay = mapUtils.featureFormat(featureDownWayParam);

        mapUtils.addPathGroup( getDetailInfo.routeId+'_up' , formatFeatureUpWay, getDetailInfo.routeId+'_down', formatFeatureDownWay);


        var nodeUpStr = "";
        var nodeDownStr = "";

        var targetUpNode = $("#bus_stop_up_tab")
        targetUpNode.html("");

        var targetDownNode = $("#bus_stop_down_tab");
        targetDownNode.html("");
    console.log( JSON.stringify(getUpWayNodes));
        $.each( getUpWayNodes, ( i,item )=>{
            nodeUpStr += '<div class="search-row">'
            + '<span>'+item.nodeNm+'</span>'
            + '<a href="javascript:;" onclick="javascript:realTimeBusLocation(\''+cityCode+'\', \''+item.routeId+'\');">'+item.nodeNo+'</a>'
            + '</div>';
        });

        $.each( getDownWayNodes, ( i, item )=>{
            nodeDownStr += '<div class="search-row">'
            + '<span>'+item.nodeNm+'</span>'
            + '<a href="javascript:;" onclick="javascript:realTimeBusLocation(\''+cityCode+'\', \''+item.routeId+'\');">'+item.nodeNo+'</a>'
            + '</div>';
        });

        targetUpNode.html(nodeUpStr);
        targetDownNode.html(nodeDownStr);
        } else {
            $("#bus_stop_up_tab").html("<p>조회 된 노선이 없습니다.</p>");
            $("#bus_stop_down_tab").html("<p>조회 된 노선이 없습니다.</p>");
        }

      });

      if ( $("#searchBusStopListSummary").parent().attr("open") !="open" ) {
          $("#searchBusStopListSummary").parent().attr("open",true);
        }

    }

    function realTimeBusLocation(cityCode, routeId){

        webSocketJs.init();
        var param = {"cityCode":cityCode, "routeId":routeId};
/*
        setTimeout(()=>{
            webSocketJs.sendMessage(JSON.stringify(param));
        },2000);
 */
        setInterval(()=>{
            console.log("==Call Interval==");
            webSocketJs.sendMessage(JSON.stringify(param));
        },10000);
    }
  </script>
</body>
</html>
