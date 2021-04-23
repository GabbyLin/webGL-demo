let scene, camera, renderer,sphere,controls;


function init(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
        );
    
    renderer = new THREE.WebGLRenderer(
        { antialias:true, alpha: true}
    );
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    document.body.appendChild(renderer.domElement)

    controls = new THREE.OrbitControls( camera, renderer.domElement)
    
    const geometry = new THREE.SphereGeometry( 1, 100, 100 );
    // const material = new THREE.MeshBasicMaterial({
    //     color: 0x0000ff,
    //     wireframe: true, 
    //     opacity: 0.9,
    // });

    const texture = new THREE.TextureLoader().load( 'img/crystal.jpg' );
    const material = new THREE.MeshBasicMaterial({ 
        wireframe: true, 
        opacity: 0.1,
        map: texture 
    });


    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    
    
    camera.position.z = 5;


    var count = 5;
    document.querySelector('.title').onclick = function(){
        // camera.position.z = 1
        // console.log(camera.position)  
        countMove(count)
    }

}


function animate(){
    requestAnimationFrame(animate)
    sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.01;
    renderer.render(scene,camera)
}


function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize',onWindowResize,false)

function countMove(cnt){
    console.log(cnt)
    if(cnt>1){
        camera.position.z -=0.1
        setTimeout(function(){
            countMove(camera.position.z)
        },10)
    }

    if(cnt < 1) {
        document.querySelector('.mainContentBox').classList.add('show')
        document.querySelector('.title').classList.add('hide')
    }
    
}





init();
animate();