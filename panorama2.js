var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.z = 3;
//標準是 3

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );

document.getElementById('container').appendChild( renderer.domElement );

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = true;

//limit
orbit.minDistance = 1;
orbit.maxDistance = 5;
orbit.maxPolarAngle = 1.7;//往上轉
orbit.minPolarAngle = 1.5;//往下轉
//maxPolarAngle和minPolarAngle設一樣，上下就轉不動了
orbit.maxAzimuthAngle = 0.5;
orbit.minAzimuthAngle = -0.5;
//maxAzimuthAngle和minAzimuthAngle是水平選轉角度
//數字越小旋轉角度越小，建議設一樣用正負數表示
//最小和最大分是[-Math.PI*2,Math.PI*2]=>設這樣就無法水平旋轉


//有了z軸一定要有light
// var lights = [];
// lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[ 0 ].position.set( 0, 200, 0 );
// lights[ 1 ].position.set( 100, 200, 100 );
// lights[ 2 ].position.set( - 100, - 200, - 100 );
// scene.add( lights[ 0 ] );
// scene.add( lights[ 1 ] );
// scene.add( lights[ 2 ] );

var light = new THREE.AmbientLight( 0x404040 , 5 ); // soft white light
scene.add( light );

// SphereBufferGeometry
var sphereBufferGeometry = new THREE.SphereBufferGeometry(
    // radius -- default 1
    12,
    // widthSegments -- default 8
    10,
    // heightSegments -- default 6
    4,
    // phiStart -- default 0
    135,
    // phiLength -- default Math.PI * 2
    3,
    // thetaStart -- default 0
    1,
    // thetaLength -- default Math.PI
    1
);
var texture = new THREE.TextureLoader().load( 'img/panorama4.jpg' );
var material = new THREE.MeshPhongMaterial({ 
    map: texture,
    side: THREE.DoubleSide,
});
var mesh = new THREE.Mesh(sphereBufferGeometry,material);

scene.add( mesh );

// const texture = new THREE.TextureLoader().load( 'img/panorama.jpg' );
// const material = new THREE.MeshBasicMaterial( { map: texture } );
// const mesh = new THREE.Mesh( geometry, material );







//三軸輔助線
var axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

var render = function () {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};

window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}, false );




render();