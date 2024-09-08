'use strict';

// global THREE 

function main() {
  const canvas = document.querySelector('#theHead');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 200);
  // const cameraGui = new dat.GUI();
  // cameraGui.add(camera.position, 'x', -100, 100); 
  // cameraGui.add(camera.position, 'y', -100, 100); 
  // cameraGui.add(camera.position, 'z', -100, 100); 


  const transControls = new THREE.TransformControls(camera, canvas)

  window.addEventListener('keydown', function (event) {
    switch (event.code) {
      case 'KeyG':
        transControls.setMode('translate')
        break
      case 'KeyR':
        transControls.setMode('rotate')
        break
      case 'KeyS':
        transControls.setMode('scale')
        break
    }
  });

  // const controls2 = new THREE.OrbitControls(camera, canvas);
  // controls2.target.set(0, 5, 0);
  // controls2.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');
  scene.add(transControls);

  const skyColor = 0xB1E1FF;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const intensity = 1;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.Math.degToRad(camera.fov * 0.05);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    //.. compute a unit vector that points in the direction the camera is now
    //.. in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 1, 1))
      .normalize();

    //.. move the camera to a position distance units way from the center
    //.. in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    //.. pick some near and far values for the frustum that
    //.. will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    //.. point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('./Head_Sculpt_2.glb', (gltf) => {
      const root = gltf.scene;
      root.rotation.y = Math.PI * 1.2;
      scene.add(root);

      //.. compute the box that contains all the stuff
      //.. from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      //.. set the camera to frame the box
      //NOTE: this box math can be reconciled up where the box size is defined.  do
      frameArea(boxSize * 0.07, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      // transControls.attach(gltf.scene);
      window.addEventListener('mouseup', () => {
        console.log(`x: ${root.position.x},
                                     y: ${root.position.y},
                                     z: ${root.position.z},
                                     rot x: ${root.rotation.x},
                                     rot y: ${root.rotation.y},
                                     rot z: ${root.rotation.z},
                                     `);
      })

      // controls2.maxDistance = boxSize * 10;
      // controls2.target.copy(boxCenter);
      // controls2.update();

      //Head follows cursor
      //Build (with tweening) a feature for head to lose interest intermitently (to and from looking at cursor and looking straight ahead)
      window.addEventListener('mousemove', function (event) {
        let rawMouseX = event.clientX;
        let rawMouseY = event.clientY;

        // Normalize mouse position in the window (range from -1 to 1)
        let normalizedMouseX = (rawMouseX / window.innerWidth) * 2 - 1;
        let normalizedMouseY = (rawMouseY / window.innerHeight) * 2 - 1;

        // Adjust rotation around Y-axis to follow the mouse horizontally
        // let rotationY = normalizedMouseX * 0.5;  // Control sensitivity for verticle movement
        // root.rotation.y = Math.PI + rotationY;   // Adding Math.PI to account for the new orientation

        // Adjust rotation around Z-axis to follow the mouse vertically
        let rotationZ = normalizedMouseY * 0.5;  // Control sensitivity for horizontal tilt
        root.rotation.z = -rotationZ;
        // let distanceFromTop = rawMouseY / window.innerHeight;
        // let testTheZ = distanceFromTop * (-0.83);
        // root.rotation.z = testTheZ;

        // let distanceFromTheSide = (window.innerWidth - rawMouseX) / window.innerWidth;
        // let testTheY = distanceFromTheSide * (0.9);
        // root.rotation.y = Math.abs(testTheY);
      })

      //set the head in just the right place based on the transforms found using transform controls
      root.translateX(-1.5727917680066588);
      root.translateY(0.6245890408992505);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);


    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();