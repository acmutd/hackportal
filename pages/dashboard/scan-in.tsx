import Head from 'next/head';
import React, { useRef, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';
import QRCode from '../../components/QRCode';
import QRCodeReader from '../../components/QRCodeReader';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Scan() {
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';
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
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Scan-In" />
      </Head>

      {/* ghost section to fill in for fixed sidebar */}
      <section
        id="ghost"
        className="flex justify-center h-screen sticky top-0 lg:w-1/8 md:w-1/7 w-1/6"
      ></section>

      <section
        id="Sidebar"
        className="flex justify-center items-center h-screen fixed top-16 border-r-2 border-gray-600 lg:w-1/8 md:w-1/7 w-1/6 text-xs lg:text-sm text-center"
      >
        <div>Welcome, {!user || !isSignedIn ? 'hacker' : user.firstName}</div>
        <div className="text-indigo-500">{role}</div>
      </section>

      <section id="mainContent" className="px-6 py-3 w-5/6 lg:wd-7/8 md:w-6/7">
        <section id="subheader" className="w-full pb-6 sticky top-16">
          <DashboardHeader />
        </section>
        <div className="font-bold text-2xl md:text-4xl lg-text-6xl">Big Heading</div>
      </section>

      {isSignedIn ? (
        <div className="top-6 flex flex-col items-center justify-center">
          <div>
            <h4 className="text-center text-xl">Hacker Tag</h4>
            <span className="text-center text-lg">{error}</span>
          </div>
          <div
            className="rounded-2xl bg-green-300 text-center p-3 m-auto cursor-pointer hover:brightness-125"
            onClick={fetchQR}
          >
            Gen QR
          </div>
          <QRCode data={qrData} loading={qrLoading} width={200} height={200} />
        </div>
      ) : (
        <div className="top-6">
          <h4>Invalid Login</h4>
        </div>
      )}
    </div>
  );
}
