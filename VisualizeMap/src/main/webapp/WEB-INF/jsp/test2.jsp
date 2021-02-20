<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="cmm/taglib.jsp" %>
<!-- <link href="/resources/dist/build.css" type="text/css" rel="stylesheet"> -->

<!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css"> -->

<script src="/resources/js/jquery.min.js"></script>
<script src="/resources/js/common.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1.1.4/dist/sockjs.js"></script>
<script src="/resources/js/webSocket.js"></script>
<script src="/resources/js/maps_utils.js"></script>

<head>
</head>
<body>

  <script>

      $(function(){
        webSocketJs.init();
        var a = {"cityCode":"23", "routeId":"ICB165000102"};
        setTimeout(()=>{
            webSocketJs.sendMessage(JSON.stringify(a));
        },2000);

      });
  </script>
</body>
</html>
