import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-model3d',
  standalone: true,
  imports: [],
  templateUrl: './model3d.component.html',
  styleUrl: './model3d.component.css'
})
export class Model3dComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationFrameId!: number;

  ngOnInit(): void {
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }

  private initThree(): void {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    this.scene.add(light);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -1.5;
    this.scene.add(cube);

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 1.5;
    this.scene.add(sphere);


    // Create a Cubic Bezier Curve from cube to sphere
    const start = new THREE.Vector3(-1.5, 0, 0); // position of cube
    const control1 = new THREE.Vector3(0, 2, 0); // control point 1
    const control2 = new THREE.Vector3(0, -2, 0); // control point 2
    const end = new THREE.Vector3(1.5, 0, 0);     // position of sphere

    const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);

    // Get points along the curve
    const points = curve.getPoints(50);

    // Create geometry and material
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the line and add to scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);


    const loader = new THREE.TextureLoader();
    loader.load('heart.png', (texture) => {
      const geometry = new THREE.SphereGeometry(0.75, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.y = -2;
      this.scene.add(plane) ;

  });

  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Optional: simple rotation
    this.scene.children.forEach((mesh: any) => {
      if (mesh instanceof THREE.Mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }
    });

    this.renderer.render(this.scene, this.camera);






  };
}
