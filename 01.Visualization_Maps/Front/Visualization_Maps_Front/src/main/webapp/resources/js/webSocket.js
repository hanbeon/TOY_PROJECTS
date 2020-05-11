/**
 *
 */

var webSocketJs =
{
  sock : "",

  init : function(){
    this.sock = new SockJS("http://222.121.219.245:7070/mapback/webSocket");
    this.sock.onmessage = this.onMessage;
  },

  sendMessage : function(msg) {
      this.sock.send(msg);
  },

  onMessage : function(evt){
    var result = evt;

    if ( result.data == null  ){
        this.sock.close();
        alert("현재 운행 중인 버스가 없습니다.");
    }
    var data = result.data;

    console.log("==== DATA :: WebSocket ====");


    var JsonObj = JSON.parse(data);

    var coordinates = new Array();


    $.each( JsonObj, (idx,item)=>{

        coordinates.push( [ Number(item.gpslong), Number(item.gpslati) ] );

    })


    var mapOption=
    {
         "coordinates" : coordinates
        ,"modelId"     : "busModel"
        ,"modelObj"     :"/resources/Public_Bus.glb"
    }

    console.log("== ADD BUS MODEL : START");
    map3dFunc.addModel(mapOption);
    console.log("== ADD BUS MODEL : END");

    map3dFunc.setMarker(coordinates);

    //mapUtils.removeMarker();
    //mapUtils.addMarker(data);
  },

  connectClose : function(){
        this.sock.close();
  }
}