import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Earth from "./Earth";
import Character from "./Character";

const Game = () => {
  const mountRef = useRef(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 카메라 설정
    camera.position.set(0, 6, 10);
    camera.lookAt(0, 3, 0);

    // 빛 추가
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Clean-up
    return () => {
      if (mountRef.current) {
        const canvas = mountRef.current.querySelector("canvas");
        if (canvas) {
          mountRef.current.removeChild(canvas); // 안전하게 DOM 제거
        }
      }
      renderer.dispose(); // WebGLRenderer 메모리 해제
    };
  }, []);

  return (
    <div ref={mountRef}>
      <Earth scene={scene} />
      <Character scene={scene} />
    </div>
  );
};

export default Game;
