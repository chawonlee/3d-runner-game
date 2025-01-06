import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Airplane from "./Airplane";

const Game = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = new THREE.WebGLRenderer();

    camera.position.z = 10; // 카메라 위치
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current && mountRef.current.childNodes.length === 0) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 배경 추가
    const loader = new THREE.TextureLoader();
    loader.load(
      "/assets/images/sky.jpg", // 배경 이미지 경로 확인
      (texture) => {
        scene.background = texture; // 배경 텍스처 설정
      },
      undefined,
      (error) => {
        console.error("Error loading background texture:", error);
      }
    );

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
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}>
      <Airplane scene={sceneRef.current} />
    </div>
  );
};

export default Game;
