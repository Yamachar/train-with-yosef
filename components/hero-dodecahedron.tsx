"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroDodecahedron({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    camera.position.z = 8;

    const ambient = new THREE.AmbientLight("#fff4d0", 0.6);
    const keyLight = new THREE.DirectionalLight("#ffd87a", 1.2);
    keyLight.position.set(4, 3, 6);
    const fillLight = new THREE.DirectionalLight("#7f8fb8", 0.5);
    fillLight.position.set(-4, -2, 3);
    scene.add(ambient, keyLight, fillLight);

    const award = new THREE.Group();
    const parts: THREE.Mesh[] = [];

    const backPlateMaterial = new THREE.MeshStandardMaterial({
      color: "#16181f",
      metalness: 0.65,
      roughness: 0.38,
    });
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: "#d4af5a",
      metalness: 0.9,
      roughness: 0.22,
      emissive: "#3a2b08",
      emissiveIntensity: 0.18,
    });

    const badgeTexture = new THREE.TextureLoader().load("/issa-elite-trainer.png");
    badgeTexture.colorSpace = THREE.SRGBColorSpace;
    const badgeMaterial = new THREE.MeshStandardMaterial({
      map: badgeTexture,
      transparent: true,
      alphaTest: 0.08,
      metalness: 0.18,
      roughness: 0.62,
    });

    const addPart = (geometry: THREE.BufferGeometry, material: THREE.Material, z: number) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z;
      parts.push(mesh);
      award.add(mesh);
    };

    const badgeWidth = 4.8;
    const badgeHeight = 3.7;
    addPart(new THREE.BoxGeometry(badgeWidth + 0.25, badgeHeight + 0.25, 0.14), backPlateMaterial, -0.11);
    addPart(new THREE.PlaneGeometry(badgeWidth, badgeHeight), badgeMaterial, 0);

    const rimHorizontal = new THREE.Mesh(
      new THREE.BoxGeometry(badgeWidth + 0.42, 0.12, 0.12),
      rimMaterial,
    );
    rimHorizontal.position.set(0, badgeHeight / 2 + 0.07, 0.03);
    parts.push(rimHorizontal);
    award.add(rimHorizontal);

    const rimHorizontalBottom = rimHorizontal.clone();
    rimHorizontalBottom.position.set(0, -(badgeHeight / 2 + 0.07), 0.03);
    parts.push(rimHorizontalBottom);
    award.add(rimHorizontalBottom);

    const rimVertical = new THREE.Mesh(new THREE.BoxGeometry(0.12, badgeHeight + 0.42, 0.12), rimMaterial);
    rimVertical.position.set(-(badgeWidth / 2 + 0.07), 0, 0.03);
    parts.push(rimVertical);
    award.add(rimVertical);

    const rimVerticalRight = rimVertical.clone();
    rimVerticalRight.position.set(badgeWidth / 2 + 0.07, 0, 0.03);
    parts.push(rimVerticalRight);
    award.add(rimVerticalRight);

    const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: "#d4af5a",
      transparent: true,
      opacity: 0.14,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);

    scene.add(glowMesh);
    scene.add(award);

    const baseOrientationZ = -(Math.PI / 2) * 3;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    const animate = () => {
      const t = performance.now() * 0.001;
      award.rotation.y = 0;
      award.rotation.x = 0;
      award.rotation.z = baseOrientationZ + Math.sin(t * 0.45) * 0.006;
      award.position.y = 0;
      glowMesh.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      parts.forEach((part) => {
        part.geometry.dispose();
      });
      backPlateMaterial.dispose();
      rimMaterial.dispose();
      badgeMaterial.dispose();
      badgeTexture.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className ?? "h-[350px] w-full sm:h-[420px]"} aria-hidden="true" />;
}
