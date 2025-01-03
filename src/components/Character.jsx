import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Character = ({ scene }) => {
  useEffect(() => {
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let mixer; // 애니메이션 믹서

    loader.load(
      "/assets/models/run_forrest/scene.gltf",
      (gltf) => {
        const character = gltf.scene;
        character.scale.set(0.5, 0.5, 0.5);
        character.position.set(0, 3, 0);
        character.rotation.y = Math.PI / 2; // 옆으로 보기
        scene.add(character);

        // 애니메이션 믹서 설정
        mixer = new THREE.AnimationMixer(character);
        const action = mixer.clipAction(gltf.animations[0]); // 첫 번째 애니메이션 실행
        action.play();
      },
      undefined,
      (error) => {
        console.error("Error loading character:", error);
      }
    );

    // 애니메이션 루프 업데이트
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta(); // 프레임 간 시간
      if (mixer) mixer.update(delta); // 애니메이션 업데이트
    };
    animate();

    return () => {
      if (mixer) mixer.stopAllAction(); // 클린업
    };
  }, [scene]);

  return null;
};

export default Character;
