import * as THREE from "three";
import gsap from "gsap";
import * as dat from "lil-gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeApp {
  constructor(selector) {
    // Debug
    const gui = new dat.GUI();

    this.container = selector;

    // Scene
    const scene = new THREE.Scene();

    // add lights:
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 0, 10);
    scene.add(pointLight);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      renderer.setSize(sizes.width, sizes.height);
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    });

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

    const material = new THREE.MeshMatcapMaterial();
    material.matcap = matcapTexture;

    material.flatShading = true;

    material.side = THREE.DoubleSide;

    // * Objects
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
    sphere.position.x = -1.5;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    plane.position.x = -0.5;
    plane.position.y = 1.2;
    plane.scale.set(0.6, 0.6, 0.6);

    const circle = new THREE.Mesh(new THREE.CircleGeometry(0.45, 32), material);
    circle.position.x = 0.5;
    circle.position.y = 1.2;

    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material);
    torus.position.x = 1.5;

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    cube.position.x = -3;

    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 1, 32),
      material
    );
    cylinder.position.x = 3;

    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1, 32), material);
    cone.position.y = -1.5;

    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.3, 0.2, 100, 16),
      material
    );
    torusKnot.position.y = -1.5;
    torusKnot.position.x = -1.5;

    const dodecahedron = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.5, 0),
      material
    );
    dodecahedron.position.y = -1.5;
    dodecahedron.position.x = 1.5;

    scene.add(
      sphere,
      plane,
      torus,
      cube,
      cylinder,
      circle,
      cone,
      torusKnot,
      dodecahedron
    );

    // * Width a Double-Click, you'll go to fullscreen
    window.addEventListener("dblclick", () => {
      const fullScreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;
      if (!fullScreenElement) {
        if (selector.requestFullscreen) selector.requestFullscreen();
        else if (selector.webkitRequestFullscreen()) selector.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
    });

    const loader = new GLTFLoader();

    let pepe = null;
    loader.load("./pepe-assets/scene.gltf", function (gltf) {
      const object = gltf.scene;
      pepe = object;

      pepe.scale.set(0.4, 0.4, 0.4);
      pepe.position.set(0, 0.2, 0);
      scene.add(pepe);

      // pepe.traverse((child) => {
      //   if (child.isMesh) {
      //     child.material = material;
      //   }
      // });

      gui.add(pepe, "visible").name("pepe visible");
    });

    // * Camera
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height);
    camera.position.z = 7;
    scene.add(camera);

    const orbitControls = new OrbitControls(camera, this.container);

    orbitControls.enableDamping = true;

    // * Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.render(scene, camera);

    this.container.appendChild(renderer.domElement);

    // * Mouse movement affects Pepe's rotation slightly
    const cursor = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (event) => {
      cursor.x = (event.clientX / sizes.width) * 2 - 1;
      cursor.y = -(event.clientY / sizes.height) * 2 + 1;

      if (pepe) {
        pepe.rotation.y = cursor.x * 2;
        pepe.rotation.z = -cursor.y * 0.5;
      }
    });

    // * Arrows will move Pepe
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        gsap.to(pepe.position, {
          duration: 0.25,
          x: pepe.position.x + -0.5,
        });
      } else if (event.key === "ArrowRight") {
        gsap.to(pepe.position, {
          duration: 0.25,
          x: pepe.position.x + 0.5,
        });
      } else if (event.key === "ArrowUp") {
        gsap.to(pepe.position, {
          duration: 0.25,
          y: pepe.position.y + 0.5,
        });
      } else if (event.key === "ArrowDown") {
        gsap.to(pepe.position, {
          duration: 0.25,
          y: pepe.position.y - 0.5,
        });
      }
      if (event.key === "Enter") {
        gsap.to(pepe.position, {
          duration: 0.18,
          z: pepe.position.z + 2,
        });
      }
      if (event.key === "Shift") {
        gsap.to(pepe.position, {
          duration: 0.18,
          z: pepe.position.z - 2,
        });
      }
      if (event.key === "Backspace") {
        gsap.to(pepe.position, {
          duration: 0.18,
          z: pepe.position.z - 2,
        });
      }

      if (event.key === "s") {
        gsap.to(pepe.rotation, {
          // give a 360 spin:
          duration: 0.22,
          y: pepe.rotation.y + Math.PI * 2,
        });
      }
      if (event.key === "f") {
        gsap.to(pepe.rotation, {
          // give a 360 spin:
          duration: 0.22,
          x: pepe.rotation.x + Math.PI * 2,
        });
      }
      if (event.key === " ") {
        const objectsToSpin = [
          pepe,
          sphere,
          plane,
          torus,
          cube,
          cylinder,
          circle,
          cone,
          torusKnot,
          dodecahedron,
        ];

        objectsToSpin.forEach((object) => {
          gsap.to(object.rotation, {
            duration: 0.5,
            y: object.rotation.y + Math.PI * 2,
          });
        });
      }
    });

    const clock = new THREE.Clock();

    // * Update function (runs every frame)
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      sphere.rotation.x = 0.15 * elapsedTime;
      plane.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;
      cube.rotation.x = 0.15 * elapsedTime;
      cylinder.rotation.x = 0.15 * elapsedTime;
      circle.rotation.x = 0.15 * elapsedTime;
      cone.rotation.x = 0.15 * elapsedTime;
      torusKnot.rotation.x = 0.15 * elapsedTime;
      dodecahedron.rotation.x = 0.15 * elapsedTime;

      requestAnimationFrame(tick);
      renderer.render(scene, camera);
      orbitControls.update();
    };
    tick();
  }
}
export default ThreeApp;
