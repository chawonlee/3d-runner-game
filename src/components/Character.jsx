import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Character = ({ scene }) => {
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/assets/models/run_forrest/scene.gltf", (gltf) => {
      const character = gltf.scene;
      character.scale.set(0.5, 0.5, 0.5); // 캐릭터 크기 조정
      character.position.set(0, 3, 0); // 지구 표면에 배치
      scene.add(character);

      // 점프 이벤트
      const handleJump = (event) => {
        if (event.code === "Space") {
          character.position.y = 4; // 점프 (간단히 예시)
          setTimeout(() => {
            character.position.y = 3; // 원래 높이로 복귀
          }, 300);
        }
      };

      document.addEventListener("keydown", handleJump);

      // Clean-up
      return () => {
        document.removeEventListener("keydown", handleJump);
        scene.remove(character);
      };
    });
  }, [scene]);

  return null;
};

export default Character;
