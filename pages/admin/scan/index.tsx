import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import ScanType from '../../../components/ScanType';
import QRCodeReader from '../../../components/QRCodeReader';
import LoadIcon from '../../../components/LoadIcon';
import { useAuthContext } from '../../../lib/user/AuthContext';
import { isAuthorized } from '..';
import { RequestHelper } from '../../../lib/request-helper';

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
  const [showNewScanForm, setShowNewScanForm] = useState(false);
  const [newScanForm, setNewScanForm] = useState({
    name: '',
    isCheckIn: false,
  });

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

  const createNewScan = async () => {
    try {
      const newScan = {
        ...newScanForm,
        precedence: scanTypes.length,
      };
      const { status, data } = await RequestHelper.post(
        '/api/scan/create',
        {
          headers: {
            Authorization: user.token,
          },
        },
        {
          ...newScanForm,
          precedence: scanTypes.length,
        },
      );
      if (status >= 400) {
        console.log(data);
      } else
        setScanTypes((prev) => [
          ...prev,
          <ScanType
            key={newScan.name}
            data={newScan}
            name={newScan.name}
            onClick={() => handleScanClick(newScan)}
          />,
        ]);
    } catch (error) {
      console.log(error);
    }
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
      {showNewScanForm ? (
        <div className="px-6 py-4">
          <button
            className="p-3 rounded-lg border-2 hover:bg-gray-200"
            onClick={() => {
              setShowNewScanForm(false);
            }}
          >
            Back to ScanTypes List
          </button>
          <div className="text-2xl font-black text-center">Add New Scan</div>
          <div className="w-3/5 my-5 mx-auto">
            <input
              className="p-3 rounded-lg w-full border-2"
              type="text"
              name="name"
              value={newScanForm.name}
              onChange={(e) => {
                setNewScanForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              placeholder="Enter name of scantype"
            />
            <div className="flex flex-row gap-x-2 items-center my-4">
              <input
                type="checkbox"
                id="isCheckin"
                name="isCheckin"
                checked={newScanForm.isCheckIn}
                onChange={(e) => {
                  setNewScanForm((prev) => ({
                    ...prev,
                    isCheckIn: e.target.checked,
                  }));
                }}
              />
              <h1>Is this for check-in event?</h1>
            </div>
          </div>
          <div className="flex justify-around">
            <button
              className="mx-auto bg-green-300 p-3 rounded-lg font-bold hover:bg-green-200"
              onClick={async () => {
                await createNewScan();
              }}
            >
              Add Scan
            </button>
          </div>
        </div>
      ) : (
        <>
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
                <div className="text-center text-3xl font-black">
                  {success ?? 'Unexpected error!'}
                </div>
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
            <div className="mx-auto my-5">
              <button
                className="bg-green-300 p-3 rounded-lg font-bold hover:bg-green-200"
                onClick={() => {
                  setShowNewScanForm(true);
                }}
              >
                Add a new Scan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
