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

  // List of scan types fetched from backend
  const [scanTypes, setScanTypes] = useState([]);

  // Flag whether scan-fetching process is completed
  const [scansFetched, setScansFetched] = useState(false);

  // Current scan
  const [currentScan, setCurrentScan] = useState(undefined);
  const [currentScanIdx, setCurrentScanIdx] = useState(-1);

  // Process data from QR code
  const [scanData, setScanData] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  // CRUD scantypes and use scan
  const [showNewScanForm, setShowNewScanForm] = useState(false);
  const [newScanForm, setNewScanForm] = useState({
    name: '',
    isCheckIn: false,
  });
  const [startScan, setStartScan] = useState(false);

  const [editScan, setEditScan] = useState(false);
  const [currentEditScan, setCurrentEditScan] = useState(undefined);

  const [deleteScan, setDeleteScan] = useState(false);

  const handleScanClick = (data, idx) => {
    setCurrentScan(data);
    setCurrentScanIdx(idx);
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

  const updateScan = async () => {
    const updatedScanData = { ...currentEditScan };
    try {
      const { status, data } = await RequestHelper.post<any, any>(
        '/api/scan/update',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
        },
        {
          scanData: updatedScanData,
        },
      );
      if (status >= 400) {
        alert(data.msg);
      } else {
        alert(data.msg);
        const newScanTypes = [...scanTypes];
        newScanTypes[currentScanIdx] = updatedScanData;
        setScanTypes(newScanTypes);
        setCurrentScan(updatedScanData);
      }
    } catch (error) {
      console.error(error);
    }
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
      } else setScanTypes((prev) => [...prev, newScan]);
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
        // const newScanTypes = [];
        // for (const d of data) {
        //   newScanTypes.push(
        //     <ScanType key={d.name} data={d} name={d.name} onClick={() => handleScanClick(d)} />,
        //   );
        // }
        setScanTypes(data);
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
              {scansFetched ? (
                scanTypes.map((d, idx) => (
                  <ScanType
                    key={d.name}
                    data={d}
                    name={d.name}
                    onClick={() => handleScanClick(d, idx)}
                  />
                ))
              ) : (
                <LoadIcon width={150} height={150} />
              )}
            </div>

            {currentScan && (
              <div className="my-6">
                <div className="flex flex-col gap-y-4">
                  <div className="text-center text-xl font-black">
                    {currentScan ? currentScan.name : ''}
                  </div>
                  {startScan ? (
                    <>
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
                              setStartScan(false);
                            }}
                          >
                            Done
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </>
                  ) : editScan ? (
                    <>
                      <div className="px-6 py-4">
                        <div className="w-3/5 my-5 mx-auto">
                          <input
                            className="p-3 rounded-lg w-full border-2"
                            type="text"
                            name="name"
                            value={currentEditScan.name}
                            onChange={(e) => {
                              setCurrentEditScan((prev) => ({
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
                              checked={currentEditScan.isCheckIn}
                              onChange={(e) => {
                                setCurrentEditScan((prev) => ({
                                  ...prev,
                                  isCheckIn: e.target.checked,
                                }));
                              }}
                            />
                            <h1>Is this for check-in event?</h1>
                          </div>
                        </div>
                        <div className="flex justify-around">
                          <div className="flex flex-row gap-x-3">
                            <button
                              className="bg-green-300 p-3 rounded-lg font-bold hover:bg-green-200"
                              onClick={async () => {
                                await updateScan();
                              }}
                            >
                              Update Scan Info
                            </button>
                            <button
                              className="font-bold p-3 rounded-lg bg-gray-300 hover:bg-gray-200"
                              onClick={() => {
                                setEditScan(false);
                                setCurrentScan(undefined);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mx-auto flex flex-row gap-x-4">
                      <button
                        className="font-bold bg-green-300 hover:bg-green-200 rounded-lg p-3"
                        onClick={() => {
                          setStartScan(true);
                        }}
                      >
                        Start Scan
                      </button>
                      <button
                        className="font-bold bg-gray-300 hover:bg-gray-200 rounded-lg p-3"
                        onClick={() => {
                          setCurrentEditScan(currentScan);
                          setEditScan(true);
                        }}
                      >
                        Edit Scan Info
                      </button>
                      <button
                        className="font-bold bg-red-300 hover:bg-red-200 rounded-lg p-3"
                        onClick={() => {
                          setDeleteScan(true);
                        }}
                      >
                        Delete this ScanType
                      </button>
                      <button
                        className="font-bold bg-red-300 hover:bg-red-200 rounded-lg p-3"
                        onClick={() => {
                          setCurrentScan(undefined);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!currentScan && !editScan && !deleteScan && !startScan && (
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
            )}
          </div>
        </>
      )}
    </div>
  );
}
