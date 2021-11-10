import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import ScanType from '../../../components/ScanType';
import QRCodeReader from '../../../components/QRCodeReader';
import LoadIcon from '../../../components/LoadIcon';
import { useAuthContext } from '../../../lib/user/AuthContext';
import { isAuthorized } from '..';

/**
 * The admin scanning page.
 *
 * Landing: /admin/scan
 */
export default function Admin() {
  const { user, isSignedIn } = useAuthContext();
  const [scanTypes, setScanTypes] = useState([]);
  const [scansFetched, setScansFetched] = useState(false);
  const [currentScan, setCurrentScan] = useState(undefined);
  const [scanData, setScanData] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleScanClick = (data) => {
    setCurrentScan(data);
  };

  const handleScan = async (
    data: string,
    video: HTMLVideoElement,
    setVideoReady,
    setPaused,
    tick,
  ) => {
    if (!data.startsWith('hack:')) {
      setScanData(data);
      setSuccess('Invalid hacker tag format...');
      return;
    }
    const query = new URL(`http://localhost:3000/api/scan`);
    query.searchParams.append('id', data.replaceAll('hack:', ''));
    fetch(query.toString().replaceAll('http://localhost:3000', ''), {
      mode: 'cors',
      headers: { Authorization: user.token },
      method: 'POST',
      body: JSON.stringify({
        id: data.replaceAll('hack:', ''),
        scan: currentScan.name,
      }),
    })
      .then(async (result) => {
        setScanData(data);
        if (result.status === 404) {
          return setSuccess('Invalid user...');
        } else if (result.status === 201) {
          return setSuccess('User has already claimed...');
        } else if (result.status !== 200) {
          return setSuccess('Unexpected error...');
        }
        setSuccess('Scan claimed...');
      })
      .catch((err) => {
        console.log(err);
        setScanData(data);
        setSuccess('Unexpected error...');
      });
  };

  const fetchScanTypes = () => {
    if (!isSignedIn || scansFetched) return;
    const query = new URL(`http://localhost:3000/api/scantypes`);
    query.searchParams.append('id', user.id);
    fetch(query.toString().replaceAll('http://localhost:3000', ''), {
      mode: 'cors',
      headers: { Authorization: user.token },
      method: 'GET',
    })
      .then(async (result) => {
        if (result.status !== 200) {
          return console.error('Fetch failed for scan-types...');
        }
        const data = await result.json();
        const newScanTypes = [];
        for (const d of data) {
          newScanTypes.push(
            <ScanType key={d.name} data={d} name={d.name} onClick={() => handleScanClick(d)} />,
          );
        }
        setScanTypes(newScanTypes);
        setScansFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchScanTypes();
  });
  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section id="subheader" className="p-4">
        <AdminHeader />
      </section>
      <div className="flex flex-col justify-center top-6">
        <div className="text-2xl font-black text-center">Scan Types</div>
        <div className="flex flex-row flex-wrap justify-center top-6">
          {scansFetched ? scanTypes : <LoadIcon width={150} height={150} />}
        </div>
        <div>
          <div className="text-center text-xl font-black">
            {currentScan ? currentScan.name : ''}
          </div>
          {currentScan && !scanData ? (
            <QRCodeReader width={200} height={200} callback={handleScan} />
          ) : (
            <div />
          )}

          {scanData ? (
            <div className="text-center text-3xl font-black">{success ?? 'Unexpected error!'}</div>
          ) : (
            <div />
          )}

          {scanData ? (
            <div className="flex m-auto items-center justify-center">
              <div
                className="w-min-5 m-3 rounded-lg text-center text-lg font-black p-3 bg-green-300 cursor-pointer hover:brightness-125"
                onClick={() => {
                  setScanData(undefined);
                }}
              >
                Next Scan
              </div>
              <div
                className="w-min-5 m-3 rounded-lg text-center text-lg font-black p-3 bg-green-300 cursor-pointer hover:brightness-125"
                onClick={() => {
                  setScanData(undefined);
                  setCurrentScan(undefined);
                }}
              >
                Done
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
