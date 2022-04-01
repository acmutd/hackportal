import { useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Point } from 'jsqr/dist/locator';
import LoadIcon from './LoadIcon';

export interface QRCodeReaderProps {
  callback?: (
    data: string,
    video: HTMLVideoElement,
    setVideoReady: (state: boolean) => void,
    setPaused: (state: boolean) => void,
    tick: () => void,
  ) => void;
  /**
   * Width & height in pixels.
   */
  width: number;
  height: number;
}

export const drawLine = (begin: Point, end: Point, context: CanvasRenderingContext2D) => {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.lineWidth = 4;
  context.stroke();
};

export default function QRCodeReader({ callback, width, height }: QRCodeReaderProps) {
  const canvas = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const video = document.createElement('video');
  video.playsInline = true;

  const tick = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      setVideoReady(true);
      const canvasElement: HTMLCanvasElement = canvas.current;
      if (!canvasElement) return requestAnimationFrame(tick);
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;
      const context = canvasElement.getContext('2d');
      context.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
      var qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (qrCode) {
        drawLine(qrCode.location.topLeftCorner, qrCode.location.topRightCorner, context);
        drawLine(qrCode.location.topRightCorner, qrCode.location.bottomRightCorner, context);
        drawLine(qrCode.location.bottomRightCorner, qrCode.location.bottomLeftCorner, context);
        drawLine(qrCode.location.bottomLeftCorner, qrCode.location.topLeftCorner, context);
        video.pause();
        setPaused(true);
        setVideoReady(false);
        callback(qrCode.data, video, setVideoReady, setPaused, tick);
        return;
      }
    }
    requestAnimationFrame(tick);
  };

  !paused &&
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment', frameRate: 30, width, height } })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(tick);
      });
  return (
    <div className="flex items-center justify-center">
      {videoReady && !paused ? <canvas ref={canvas} /> : <LoadIcon width={width} height={height} />}
    </div>
  );
}
