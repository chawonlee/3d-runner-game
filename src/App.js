import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const App = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 초기 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // mountRef에 기존 캔버스가 없을 때만 추가
    if (mountRef.current && !mountRef.current.querySelector("canvas")) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 박스 생성
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // 애니메이션
    gsap.to(cube.rotation, {
      x: Math.PI * 2,
      duration: 2,
      repeat: -1,
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Clean-up: 기존 리소스 정리
    return () => {
      scene.remove(cube); // 박스 제거
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (mountRef.current) {
        const canvas = mountRef.current.querySelector("canvas");
        if (canvas) {
          mountRef.current.removeChild(canvas);
        }
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default App;
