import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

const Character = ({ scene }) => {
  useEffect(() => {
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let mixer; // 애니메이션 믹서

    loader.load(
      "/assets/models/run_forrest/scene.gltf",
      (gltf) => {
        const character = gltf.scene;
        character.scale.set(1, 1, 1); // 사람 크기를 확대
        character.position.set(0, 4, 0); // 위치는 동일
        character.rotation.y = Math.PI / 2; // 옆으로 보기
        scene.add(character);

        // 점프 애니메이션
        const handleJump = (event) => {
          if (event.code === "Space") {
            gsap.to(character.position, {
              y: 6, // 점프 높이
              duration: 0.3, // 상승 시간
              yoyo: true, // 다시 내려오기
              repeat: 1, // 한 번 반복
            });
          }
        };

        // 이벤트 리스너 등록
        document.addEventListener("keydown", handleJump);

        // 애니메이션 믹서 설정
        mixer = new THREE.AnimationMixer(character);
        const action = mixer.clipAction(gltf.animations[0]); // 첫 번째 애니메이션 실행
        action.play();

        // Clean-up
        return () => {
          document.removeEventListener("keydown", handleJump); // 이벤트 리스너 제거
        };
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
      if (mixer) mixer.stopAllAction(); // 애니메이션 중지
    };
  }, [scene]);

  return null;
};

export default Character;
