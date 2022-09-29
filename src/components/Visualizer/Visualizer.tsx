import React, { useCallback, useEffect, useRef } from "react";
import { VisualizerStyled } from "./style";
type Props = {
  audioRef: any;
  isPlaying: boolean;
};
export const Visualizer = (props: Props) => {
  const { audioRef, isPlaying } = props;
  const canvasRef = useRef<any>();
  const context = useRef<any>();
  const audioContext = useRef<any>();
  const source = useRef<any>();
  const analyser = useRef<any>();
  const bufferLength = useRef<any>();
  const frequencyArray = useRef<any>([]);
  const rafId = useRef<any>();

  const canvasPrimaryColor = "#ffffff14";
  const canvasSecondaryColor = "#4d4c4c1f";
  const stroke = "#3b3d526b";

  useEffect(() => {
    if (isPlaying) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(rafId.current);
    }
  }, [isPlaying]);

  const animate = useCallback(() => {
    rafId.current = requestAnimationFrame(animate);

    const CENTERX = canvasRef.current.width / 2;
    const CENTERY = canvasRef.current.height / 2;

    const WIDTH = canvasRef.current.width;
    const HEIGHT = canvasRef.current.height;

    analyser.current.getByteFrequencyData(frequencyArray.current);
    context.current.clearRect(0, 0, WIDTH, HEIGHT);

    let gradient = context.current.createLinearGradient(
      0,
      110,
      90,
      30,
      100,
      100,
      70
    );
    gradient.addColorStop(0.1, canvasPrimaryColor);
    gradient.addColorStop(0.4, canvasSecondaryColor);
    gradient.addColorStop(0.7, canvasSecondaryColor);
    gradient.addColorStop(0.9, canvasPrimaryColor);
    gradient.addColorStop(1, canvasPrimaryColor);

    for (let i = 0; i < bufferLength.current; i++) {
      let radius = frequencyArray.current[i] / 4;
      if (radius < 20) radius = 20;
      if (radius > 100) radius = 100;
      context.current.beginPath();
      context.current.arc(CENTERX, CENTERY, radius, 0, 2 * Math.PI, false);
      context.current.fillStyle = gradient;
      context.current.fill();
      context.current.lineWidth = 10;
      context.current.strokeStyle = stroke;
      context.current.stroke();
    }
  }, []);

  const drawCircle = useCallback(() => {
    const canvasCtx = context.current;

    const WIDTH = canvasCtx.width;
    const HEIGHT = canvasCtx.height;

    analyser.current.fftSize = 32;
    bufferLength.current = analyser.current.frequencyBinCount;
    frequencyArray.current = new Uint8Array(bufferLength.current);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    animate();
  }, [animate]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioContext.current = new window.AudioContext();
      if (!source.current) {
        context.current = canvasRef.current.getContext("2d");
        source.current = audioContext.current.createMediaElementSource(
          audioRef.current
        );
        analyser.current = audioContext.current.createAnalyser();
        source.current.connect(analyser.current);
        analyser.current.connect(audioContext.current.destination);
        bufferLength.current = analyser.current.frequencyBinCount;
        drawCircle();
      }
    }
  }, [audioRef, isPlaying, drawCircle]);

  return (
    <VisualizerStyled>
      <canvas ref={canvasRef} width={150} height={150} />
    </VisualizerStyled>
  );
};
