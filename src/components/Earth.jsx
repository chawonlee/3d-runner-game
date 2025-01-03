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
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
    });
  }, [scene]);

  return null;
};

export default Earth;
