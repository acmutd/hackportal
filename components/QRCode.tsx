import { useEffect, useRef } from 'react';
import LoadIcon from './LoadIcon';
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
}

export default function QRCode({ data, loading, width, height }: QRCodeProps) {
  const canvas = useRef(null);
  useEffect(() => {
    if (!canvas.current) return console.error('Invalid QRCode canvas referenece...');
    if (!data || data === '') return console.warn('No QRCode data found, aborting display...');
    toCanvas(canvas.current, data, { width });
  });
  return !loading ? <canvas ref={canvas} /> : <LoadIcon width={width} height={height} />;
}
