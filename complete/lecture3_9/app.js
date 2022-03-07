import * as THREE from '../../libs/three125/three.module.js';
import { OrbitControls } from '../../libs/three125/OrbitControls.js';
import { Stats } from '../../libs/stats.module.js';
import { ARButton } from '../../libs/ARButton.js';


class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.clock = new THREE.Clock();
        
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
		
		this.scene = new THREE.Scene();
       
		this.scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 ).normalize();
		this.scene.add( light );
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
		container.appendChild( this.renderer.domElement );
        
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set(0, 3.5, 0);
        this.controls.update();
        
        this.stats = new Stats();

        
        this.initScene();
        this.setupVR();
        
        window.addEventListener('resize', this.resize.bind(this) );

        
	}	
    
    initScene(){
        //this.geometry = new THREE.BoxBufferGeometry( 0.06, 0.06, 0.06 ); 
        this.meshes = [];

        let controller;

        const texturearray = ['https://www.larvalabs.com/cryptopunks/cryptopunk3747.png','https://www.larvalabs.com/cryptopunks/cryptopunk1148.png', 'https://www.larvalabs.com/cryptopunks/cryptopunk2954.png' ]

        //Add couple of images as an array here
        
     /*    'boss-beauties-nft-project-768x768.jpg.webp'
        'crypto-chicks-NFT-pfp-project-768x768.jpg.webp'
        'sad-girls-bar-nft-project-768x768.jpg.webp'
         */

       
            // plane.material.side = THREE.DoubleSide;

        //var mesh = new THREE.Mesh(geometry2, material2);
        

        controller = this.renderer.xr.getController( 0 );

        for (let i = 0; i < 3; i++) {

            var texture = new THREE.TextureLoader().load( texturearray[i]    );

            
            var material2 = new THREE.MeshBasicMaterial( { map: texture } );

            var geometry2 = new THREE.PlaneGeometry(.1, .1);
   
            var mesh2 = new THREE.Mesh( geometry2, material2 ); 
           // set the position of the image mesh in the x,y,z dimensions

            //mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
            
            //mesh2.position.set(-5+ 2*(i%5),i/5,0).applyMatrix4( controller.matrixWorld );
            mesh2.position.set(0.11*(i%4)-0.2 ,0.11*(i/4)-0.2, - 0.3 ).applyMatrix4( controller.matrixWorld );
           
        
            // add the image to the scene
            mesh2.quaternion.setFromRotationMatrix( controller.matrixWorld );
            this.scene.add( mesh2 );
          }
        


        

        

    }
    
    setupVR(){
        this.renderer.xr.enabled = true; 
        
        const self = this;
        
        
        function onSelect() {
            // const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
            // const mesh = new THREE.Mesh( self.geometry, material );

                  

           
            //self.meshes.push( mesh );

            // scene.add(mesh2);

        }

        const btn = new ARButton( this.renderer );
        
        // controller = this.renderer.xr.getController( 0 );
        // controller.addEventListener( 'select', onSelect );
        // this.scene.add( controller );
        
        this.renderer.setAnimationLoop( this.render.bind(this) );
    }
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.stats.update();
  //      this.meshes.forEach( (mesh) => { mesh.rotateY( 0.01 ); });
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };