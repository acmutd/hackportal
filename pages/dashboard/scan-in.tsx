import Head from 'next/head';
import React, { useRef, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuthContext } from '../../lib/user/AuthContext';
import QRCode from '../../components/QRCode';
import QRCodeReader from '../../components/QRCodeReader';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Scan() {
  const { user, isSignedIn } = useAuthContext();
  const [qrData, setQRData] = useState('');
  const [qrLoading, setQRLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('');

  const fetchQR = () => {
    if (!isSignedIn) return;
    setQRLoading(true);
    const query = new URL(`http://localhost:3000/api/applications/${user.id}`);
    query.searchParams.append('id', user.id);
    fetch(query.toString().replaceAll('http://localhost:3000', ''), {
      mode: 'cors',
      headers: { Authorization: user.token },
      method: 'GET',
    })
      .then(async (result) => {
        if (result.status !== 200) {
          return setError('QR fetch failed. Please contact an event organizer.');
        }
        const data = await result.json();
        setQRData(data.id);
        setQRLoading(false);
        setError('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisplay = (data: string, video: HTMLVideoElement) => {
    video.pause();
    setUserData(data);
  };

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Scan-In" />
      </Head>
      <section id="subheader" className="p-4">
        <DashboardHeader />
      </section>
      {isSignedIn ? (
        <div className="top-6 flex flex-col items-center justify-center">
          <div>
            <h4 className="text-center text-xl" onClick={fetchQR}>
              Fetch QR
            </h4>
            <span className="text-center text-lg">{error}</span>
          </div>
          <QRCode data={qrData} loading={qrLoading} width={200} height={200} />
          <div>
            <h4 className="text-center text-xl">Scan QR</h4>
            <h4 className="text-center text-md">{userData}</h4>
          </div>
          <QRCodeReader callback={handleDisplay} width={200} height={200} />
        </div>
      ) : (
        <div className="top-6">
          <h4>Invalid Login</h4>
        </div>
      )}
    </div>
  );
}
