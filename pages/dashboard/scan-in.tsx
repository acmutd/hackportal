import Head from 'next/head';
import React, { useRef, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuthContext } from '../../lib/user/AuthContext';
import QRCode from '../../components/QRCode';
import QRCodeReader from '../../components/QRCodeReader';
import Sidebar from './Components/Sidebar';

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
        setQRData(`hack:${data.id}`);
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

      {/* <Sidebar /> */}

      {/* <section id="mainContent" className="px-6 py-3 w-5/6 lg:wd-7/8 md:w-6/7"> */}
      <section id="subheader" className="p-4">
        <DashboardHeader active="/dashboard/scan-in" />
      </section>
      {isSignedIn ? (
        <div className="top-6 flex flex-col items-center justify-center">
          <div>
            <h4 className="text-center text-xl">Your Hacker Tag</h4>
            <span className="text-center text-lg">{error}</span>
          </div>
          <div
            className="rounded-2xl bg-green-300 text-center p-3 m-auto cursor-pointer hover:brightness-125"
            onClick={fetchQR}
          >
            Generate QR
          </div>
          <QRCode data={qrData} loading={qrLoading} width={200} height={200} />
        </div>
      ) : (
        <div className="top-6">
          <h4>Oops! Invalid Login!</h4>
        </div>
      )}
      {/* </section> */}
    </div>
  );
}
