import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardHeader from '../../components/dashboardComponents/DashboardHeader';
import { useAuthContext } from '../../lib/user/AuthContext';
import QRCode from '../../components/dashboardComponents/QRCode';
import QRCodeReader from '../../components/dashboardComponents/QRCodeReader';
import Sidebar from '../../components/dashboardComponents/Sidebar';

/**
 * The dashboard / scan-in.
 *
 * Landing: /scan-in
 */
export default function Scan() {
  const router = useRouter();
  const { user, isSignedIn, hasProfile } = useAuthContext();

  if (!isSignedIn)
    return (
      <div className="text-2xl font-black text-center">
        Please sign-in and register to access your QR code.
      </div>
    );

  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>Scan-In</title>
        <meta name="description" content="HackPortal's Scan-In" /> {/* !change */}
      </Head>

      <Sidebar />

      <section id="mainContent" className="px-6 py-3 lg:w-7/8 md:w-6/7 w-full">
        <DashboardHeader />
        {hasProfile ? (
          <div className="flex flex-col items-center justify-center top-6 ">
            <div>
              <h4 className="text-center text-xl">Hacker Tag</h4>
              <p>Please bring your QR code to an organizer to be scanned for events.</p>
            </div>
            <QRCode data={'hack:' + user.id} loading={false} width={200} height={200} />
          </div>
        ) : (
          <div className="top-6 flex justify-center md:text-lg text-base">
            <h4>Please register to get your QR code.</h4>
          </div>
        )}
      </section>
    </div>
  );
}
