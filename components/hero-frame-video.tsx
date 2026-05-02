"use client";

import { useEffect, useRef } from "react";

type HeroFrameVideoProps = {
  className?: string;
  frameCount?: number;
};

const padFrame = (n: number) => n.toString().padStart(3, "0");
const EARLY_START_VH = 65;

export function HeroFrameVideo({ className, frameCount = 48 }: HeroFrameVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const frames: HTMLImageElement[] = [];
    let loaded = 0;
    let frameIndex = 0;
    let rafId = 0;
    let renderQueued = false;

    const getScrollProgress = () => {
      const section = canvas.closest("section");
      if (!section) {
        const globalRange = Math.max(1, window.innerHeight);
        return Math.min(1, Math.max(0, window.scrollY / globalRange));
      }

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const baseRange = Math.max(1, section.clientHeight - window.innerHeight);
      const earlyStartPx = Math.round((window.innerHeight * EARLY_START_VH) / 100);
      const effectiveStart = sectionTop - earlyStartPx;
      const effectiveRange = Math.max(1, baseRange + earlyStartPx);
      const raw = (window.scrollY - effectiveStart) / effectiveRange;
      return Math.min(1, Math.max(0, raw));
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(frameIndex);
    };

    const drawFrame = (index: number) => {
      const img = frames[index];
      if (!img || !img.naturalWidth || !img.naturalHeight) return;

      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return;

      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const dx = (cw - drawWidth) / 2;
      const dy = (ch - drawHeight) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    };

    const renderForScroll = () => {
      renderQueued = false;
      if (loaded === 0) return;

      const progress = getScrollProgress();
      const nextIndex = Math.round(progress * (frameCount - 1));
      if (nextIndex !== frameIndex) {
        frameIndex = nextIndex;
      }
      drawFrame(frameIndex);
    };

    const queueRender = () => {
      if (renderQueued) return;
      renderQueued = true;
      rafId = window.requestAnimationFrame(renderForScroll);
    };

    for (let i = 1; i <= frameCount; i += 1) {
      const img = new Image();
      img.src = `/hero_section_video/ezgif-frame-${padFrame(i)}.jpg`;
      img.decoding = "async";
      img.onload = () => {
        loaded += 1;
        if (loaded === 1 || i === frameCount) {
          resizeCanvas();
          queueRender();
        }
      };
      frames.push(img);
    }

    resizeCanvas();
    queueRender();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", queueRender, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", queueRender);
    };
  }, [frameCount]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
