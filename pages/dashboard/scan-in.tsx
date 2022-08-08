import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuthContext } from '../../lib/user/AuthContext';
import QRCode from '../../components/QRCode';
import QRCodeReader from '../../components/QRCodeReader';
import Sidebar from './Components/Sidebar';

/**
 * The dashboard / scan-in.
 *
 * Landing: /scan-in
 */
export default function Scan() {
  const router = useRouter();
  const { user, isSignedIn, hasProfile } = useAuthContext();
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
        console.log(result);
        if (result.status !== 200) {
          setQRLoading(false);
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

  if (!isSignedIn)
    return (
      <div className="text-2xl font-black text-center">
        Please sign-in and register to access your QR code
      </div>
    );

  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>Scan-In</title>
        <meta name="description" content="HackPortal's Scan-In" /> {/* !change */}
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 lg:wd-7/8 md:w-6/7 w-full">
        <DashboardHeader />
        {hasProfile ? (
          <div className="flex flex-col items-center justify-center top-6 ">
            <div>
              <h4 className="text-center text-xl">Hacker Tag</h4>
              <p>
                Tap the button to generate your QR code to be scanned by an organizer for events
              </p>
              <span className="text-center text-lg">{error}</span>
            </div>
            <div
              className="rounded-2xl bg-green-300 text-center p-3 m-auto cursor-pointer hover:brightness-125 my-3"
              onClick={fetchQR}
            >
              Fetch QR
            </div>
            <QRCode data={qrData} loading={qrLoading} width={200} height={200} />
          </div>
        ) : (
          <div className="top-6 flex justify-center md:text-lg text-base">
            <h4>Please register to get your QR code</h4>
          </div>
        )}
      </section>
    </div>
  );
}
