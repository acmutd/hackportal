import { useEffect, useRef } from 'react';
import LoadIcon from '../LoadIcon';
import { toCanvas } from 'qrcode';

export interface QRCodeProps {
  /**
   * The data to display in the QRCode.
   */
  data: string;
  /**
   * QR load state.
   */
  loading: boolean;
  /**
   * QR width/height in pixels.
   */
  width: number;
  height: number;
  /**
   * Dark represents dots, Light represents the background
   */
  darkColor: string;
  lightColor: string;
}

export default function QRCode({
  data,
  loading,
  width,
  height,
  darkColor,
  lightColor,
}: QRCodeProps) {
  const canvas = useRef(null);
  useEffect(() => {
    if (!canvas.current) return console.error('Invalid QRCode canvas referenece...');
    if (!data || data === '') return console.warn('No QRCode data found, aborting display...');
    toCanvas(canvas.current, data, { width, color: { dark: darkColor, light: lightColor } });
  });
  return !loading ? <canvas ref={canvas} /> : <LoadIcon width={width} height={height} />;
}
