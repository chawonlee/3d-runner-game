import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Airplane = ({ scene, yRange = 8 }) => {
  useEffect(() => {
    const loader = new GLTFLoader();
    let airplane;
    let mixer;

    loader.load(
      "/assets/models/airplane/scene.gltf",
      (gltf) => {
        airplane = gltf.scene;
        airplane.scale.set(0.5, 0.5, 0.5); // 비행기 크기 축소
        airplane.position.set(0, 0, 0); // 초기 위치 설정
        airplane.rotation.y = Math.PI / 2; // 비행기가 오른쪽 옆을 바라보게 회전
        scene.add(airplane);

        // 애니메이션 믹서 설정
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(airplane);
          const propellerAction = mixer.clipAction(gltf.animations[0]); // 첫 번째 애니메이션 실행
          propellerAction.play();
        }

        // 프러펠러 애니메이션 설정
        const propeller = airplane.getObjectByName("Propeller"); // 프러펠러 노드 이름 확인
        if (propeller) {
          const rotatePropeller = () => {
            propeller.rotation.z += 0.2; // 프러펠러 회전
            requestAnimationFrame(rotatePropeller);
          };
          rotatePropeller();
        } else {
          console.warn("Propeller not found. Check the node name.");
        }

        // 마우스 이벤트로 y좌표 및 방향 변경
        const handleMouseMove = (event) => {
          if (airplane) {
            const rect = document.body.getBoundingClientRect(); // 화면 크기 가져오기

            const mouseY =
              -((event.clientY - rect.top) / window.innerHeight) * 2 + 1; // -1 ~ 1 범위로 변환
            const clampedY = Math.max(-1, Math.min(1, mouseY)); // -1 ~ 1 범위로 클램핑
            airplane.position.y = clampedY * yRange; // y좌표 조정 (화면 비율에 맞게, 범위를 yRange로 설정)

            const mouseX =
              ((event.clientX - rect.left) / window.innerWidth) * 2 - 1; // -1 ~ 1 범위로 변환
            airplane.rotation.z = -mouseX * 0.5; // x좌표에 따라 비행기 방향 변경
          }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Clean-up
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          if (airplane) {
            scene.remove(airplane);
          }
        };
      },
      undefined,
      (error) => {
        console.error("Error loading airplane model:", error);
      }
    );

    // 애니메이션 루프 설정
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta); // 애니메이션 업데이트
    };

    animate();

    // Remove additional airplanes when re-rendered
    scene.traverse((object) => {
      if (object.isMesh && object !== scene.background) {
        scene.remove(object);
      }
    });
  }, [scene, yRange]);

  return null;
};

export default Airplane;
