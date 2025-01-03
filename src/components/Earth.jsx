import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import * as THREE from "three";

const Earth = ({ scene }) => {
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/assets/models/earth_cartoon/scene.gltf", (gltf) => {
      const earth = gltf.scene;
      earth.scale.set(3, 3, 3);
      scene.add(earth);

      // 지구 회전
      gsap.to(earth.rotation, {
        y: -Math.PI * 2, // 음수 값으로 설정해 반시계 방향 회전
        duration: 10, // 10초에 한 바퀴
        repeat: -1, // 무한 반복
        ease: "linear", // 일정한 속도로 회전
      });
    });
  }, [scene]);

  return null;
};

export default Earth;
