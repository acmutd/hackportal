import { useEffect, useRef } from 'react';
import { toCanvas } from 'qrcode';

export interface QRCodeProps {
  /**
   * The data to display in the QRCode.
   */
  data: string;
}

export default function QRCode({ data }: QRCodeProps) {
  const canvas = useRef(null);
  useEffect(() => {
    if (!canvas.current) return console.error('Invalid QRCode canvas referenece...');
    if (!data || data === '') return console.warn('No QRCode data found, aborting display...');
    toCanvas(canvas.current, data);
  });
  return <canvas ref={canvas} />;
}
