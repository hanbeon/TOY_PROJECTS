<html>
<head>
<meta charset="utf-8" />
<title>Add a 3D model</title>
<meta name="viewport"
    content="initial-scale=1,maximum-scale=1,user-scalable=no" />
<script src="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css"
    rel="stylesheet" />
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
</style>
</head>
<body>
    <script src="https://unpkg.com/three@0.106.2/build/three.min.js"></script>
    <script src="https://unpkg.com/three@0.106.2/examples/js/loaders/GLTFLoader.js"></script>
    <!-- <script src="/resources/js/map_3d_utils.js"></script> -->
    <script src="/resources/js/jquery.min.js"></script>
    <script src="/resources/js/common.js"></script>
    <script src="/resources/js/maps_utils.js"></script>
    <div id="map"></div>
    <script>
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuYmVvbiIsImEiOiJjangxNXd5cDcwNmZvNDNscGZ0NjBhcDd4In0.FRcBjS2p0pn74HLYPZhFxw';
        var map = (window.map = new mapboxgl.Map({
            container : 'map',
            style : 'mapbox://styles/mapbox/streets-v11',
            //style: 'mapbox://styles/mapbox/light-v10',
            zoom : 18,
            center : [ 126.747943,37.518464 ],
            pitch : 60,
            antialias : true
        // create the gl context with MSAA antialiasing, so custom layers are antialiased
        }));

        // parameters to ensure the model is georeferenced correctly on the map
        var modelOrigin	 =	[126.747943,37.518464];
        var modelOrigin2 = 	[126.743613,37.517080];
        //var modelOrigin= [126.707754,37.484145]/* ,[126.708321,37.484758]] */;
        //var modelOrigin2 = [126.708321,37.484758]
        var modelAltitude = 0;
        var modelRotate = [ Math.PI / 2, 0, 0 ];

        var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
                modelOrigin, modelAltitude);

        // transformation parameters to position, rotate and scale the 3D model onto the map
        var modelTransform = {
            translateX : modelAsMercatorCoordinate.x,
            translateY : modelAsMercatorCoordinate.y,
            translateZ : modelAsMercatorCoordinate.z,
            rotateX : modelRotate[0],
            rotateY : modelRotate[1],
            rotateZ : modelRotate[2],
            /* Since our 3D model is in real world meters, a scale transform needs to be
             * applied since the CustomLayerInterface expects units in MercatorCoordinates.
             */
            scale : modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        };

        var modelAsMercatorCoordinate2 = mapboxgl.MercatorCoordinate.fromLngLat(
                modelOrigin2, modelAltitude);

        // transformation parameters to position, rotate and scale the 3D model onto the map
        var modelTransform2 = {
            translateX : modelAsMercatorCoordinate2.x,
            translateY : modelAsMercatorCoordinate2.y,
            translateZ : modelAsMercatorCoordinate2.z,
            rotateX : modelRotate[0],
            rotateY : modelRotate[1],
            rotateZ : modelRotate[2],
            /* Since our 3D model is in real world meters, a scale transform needs to be
             * applied since the CustomLayerInterface expects units in MercatorCoordinates.
             */
            scale : modelAsMercatorCoordinate2.meterInMercatorCoordinateUnits()
        };

        var THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {
            id : '3d-model',
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
                                /* 'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', */
                                '/resources/AnyConv.com__stationBus.glb',
                                function(gltf) {
                                    this.scene.add(gltf.scene);
                                }.bind(this));
                console.log("## THIS ");
                console.log(this.map);
                console.log(map);
                this.map = map;

                // use the Mapbox GL JS map canvas for three.js
                this.renderer = new THREE.WebGLRenderer({
                    canvas : map.getCanvas(),
                    context : gl,
                    antialias : true
                });

                this.renderer.autoClear = false;
            },
            render : function(gl, matrix) {
                var rotationX = new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
                var rotationY = new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
                var rotationZ = new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

                var m = new THREE.Matrix4().fromArray(matrix);
                var l = new THREE.Matrix4().makeTranslation(
                        modelTransform.translateX, modelTransform.translateY,
                        modelTransform.translateZ).scale(
                        new THREE.Vector3(modelTransform.scale,
                                -modelTransform.scale, modelTransform.scale))
                        .multiply(rotationX).multiply(rotationY).multiply(
                                rotationZ);

                this.camera.projectionMatrix = m.multiply(l);
                this.renderer.state.reset();
                this.renderer.render(this.scene, this.camera);

                rotationX = new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(1, 0, 0), modelTransform2.rotateX);
                    rotationY = new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(0, 1, 0), modelTransform2.rotateY);
                    rotationZ = new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(0, 0, 1), modelTransform2.rotateZ);

                    m = new THREE.Matrix4().fromArray(matrix);
                    l = new THREE.Matrix4().makeTranslation(
                            modelTransform2.translateX, modelTransform2.translateY,
                            modelTransform2.translateZ).scale(
                            new THREE.Vector3(modelTransform2.scale,
                                    -modelTransform2.scale, modelTransform2.scale))
                            .multiply(rotationX).multiply(rotationY).multiply(
                                    rotationZ);


                    this.camera.projectionMatrix = m.multiply(l);
                    this.renderer.state.reset();
                this.renderer.render(this.scene, this.camera);
                this.map.triggerRepaint();


            }
        };

        map.on('style.load', function() {
            map.addLayer(customLayer, 'waterway-label');
        });




        map.on('load', function() {
            map.addSource('route', {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': [

                [126.747915, 37.518311]
                ,[126.746825, 37.518372]
                ,[126.746789, 37.516644]
                ,[126.745554, 37.516706]
                ,[126.743198, 37.516909]
                ,[126.743202, 37.517086]
                ,[126.743205, 37.517232]
                ,[126.743286, 37.517318]
                ,[126.744223, 37.518015]
                ,[126.744156, 37.518049]
                , [126.742694, 37.518141]
                , [126.740451, 37.51828]
/*
                 [126.747943,37.518464]
                ,[126.743613,37.517080]
                ,[126.742701,37.518210]
                ,[126.740458,37.518350]
                 */
            ]
            }
            }
            });
            map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            'line-color': '#888',
            'line-width': 8
            }
            });
            });

        console.log("#####################");
/*         var qq = [[126.747943,37.518464]
        ,[126.743613,37.517080]
        ,[126.742701,37.518210]
        ,[126.740458,37.518350]];
        var b = mapUtils.coordinatesAdjustment(qq);
        console.log(b); */

/*
        var a = new Array();
        a = [[126.707754,37.484145],[126.708321,37.484758],[126.707376,37.487277],[126.7083,37.487359],[126.708507,37.487616],[126.709217,37.487352],[126.709188,37.487017],[126.708636,37.487128],[126.708868,37.487406],[126.708507,37.487616],[126.7083,37.487359],[126.707376,37.487277],[126.706156,37.489338],[126.705104,37.491199],[126.705299,37.491276],[126.706087,37.491623],[126.707044,37.495006],[126.70781,37.494443],[126.709776,37.493987],[126.711343,37.490645],[126.712265,37.490918],[126.716402,37.491078],[126.7164,37.491422],[126.71729,37.491447],[126.717954,37.49146],[126.71797,37.491123],[126.719763,37.491346],[126.711954,37.490836],[126.71018,37.48976],[126.7083,37.487359],[126.707554,37.487211],[126.703613,37.494126],[126.702588,37.496222],[126.702441,37.497261],[126.702588,37.496222],[126.705104,37.491199],[126.707608,37.487195],[126.7083,37.487359],[126.710359,37.489908],[126.712128,37.490892],[126.723939,37.49138],[126.724463,37.492241],[126.723939,37.49138],[126.712128,37.490892],[126.71018,37.48976],[126.7083,37.487359],[126.707554,37.487211],[126.705687,37.490097],[126.702588,37.496222],[126.702744,37.50017],[126.703223,37.504338],[126.72161,37.503234],[126.722263,37.498608],[126.726399,37.494498],[126.722263,37.498608],[126.72161,37.503234],[126.694546,37.504913],[126.692049,37.504408],[126.694045,37.504916],[126.699626,37.504558],[126.699557,37.502831],[126.7021,37.502289],[126.702383,37.502016],[126.7021,37.502289],[126.699557,37.502831],[126.699626,37.504558],[126.696947,37.504745],[126.72161,37.503234],[126.722263,37.498608],[126.724284,37.49666],[126.722263,37.498608],[126.72161,37.503234],[126.700733,37.50448],[126.72161,37.503234],[126.722263,37.498608],[126.72296,37.498564],[126.725092,37.498426],[126.725139,37.498896],[126.725441,37.501988],[126.725512,37.503634],[126.72561,37.505523],[126.72585,37.508275],[126.725992,37.510358],[126.725021,37.510401],[126.723487,37.510466],[126.72355,37.511418],[126.72358,37.511877],[126.725756,37.51182],[126.730665,37.511604],[126.733722,37.511425],[126.735963,37.5114],[126.738832,37.512215],[126.740074,37.512851],[126.739059,37.514389],[126.73927,37.516654],[126.73932,37.517142],[126.742645,37.516948],[126.74331,37.517336],[126.744223,37.518015],[126.740451,37.51828],[126.739412,37.518341],[126.739044,37.514534],[126.739276,37.513762],[126.740074,37.512851],[126.737985,37.511841],[126.735963,37.5114],[126.73169,37.511549],[126.731289,37.507017],[126.703539,37.508586],[126.702436,37.497597],[126.704089,37.49761],[126.704411,37.495646],[126.703153,37.495425],[126.702457,37.496946],[126.702557,37.498671],[126.702187,37.499756],[126.702383,37.502016],[126.7021,37.502289],[126.699557,37.502831],[126.699626,37.504558],[126.698595,37.50463],[126.698261,37.504653],[126.698205,37.505899],[126.699625,37.505844],[126.699495,37.504567],[126.72161,37.503234],[126.721262,37.505815],[126.720548,37.507502],[126.720863,37.512003],[126.735198,37.511347],[126.737341,37.511647],[126.741812,37.513621],[126.744839,37.51366],[126.745554,37.516706],[126.750141,37.516475],[126.750707,37.519546],[126.750442,37.518168],[126.747929,37.51831],[126.746825,37.518372],[126.746834,37.51518],[126.74542,37.51556],[126.743773,37.510588],[126.743111,37.509825],[126.741587,37.508957],[126.742283,37.506491],[126.714775,37.507886],[126.714389,37.50364],[126.693463,37.504858],[126.690991,37.503774],[126.687997,37.500616],[126.685696,37.497656],[126.683873,37.496372],[126.685985,37.495393],[126.684949,37.493889],[126.682781,37.495376],[126.685649,37.497613]];

              $.each(a, function(i,item){
                  var b = new Array();
                  b.push(item[0]);b.push(item[1]);
                  var marker = new mapboxgl.Marker()
                      .setLngLat(b)
                      .addTo(map);
              })
               */
    </script>

</body>
</html>