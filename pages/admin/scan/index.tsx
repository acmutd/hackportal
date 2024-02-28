import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../../../components/adminComponents/AdminHeader';
import ScanType from '../../../components/ScanType';
import QRCodeReader from '../../../components/dashboardComponents/QRCodeReader';
import LoadIcon from '../../../components/LoadIcon';
import { useAuthContext } from '../../../lib/user/AuthContext';
import { isAuthorized } from '..';
import { RequestHelper } from '../../../lib/request-helper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Dialog } from '@headlessui/react';

const successStrings = {
  claimed: 'Scan claimed...',
  invalidUser: 'Invalid user...',
  alreadyClaimed: 'User has already claimed...',
  unexpectedError: 'Unexpected error...',
  notCheckedIn: "User hasn't checked in!",
  invalidFormat: 'Invalid hacker tag format...',
};

interface UserProfile extends Omit<Registration, 'user'> {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    permissions: string[];
    preferredEmail: string;
  };
}

function getSuccessColor(success: string) {
  if (success === successStrings.claimed) {
    return '#5fde05';
  }
  return '#ff0000';
}

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

  const [showDeleteScanDialog, setShowDeleteScanDialog] = useState(false);
  const [scannedUserInfo, setScannedUserInfo] = useState(undefined);

  const handleScanClick = (data, idx) => {
    setCurrentScan(data);
    setCurrentScanIdx(idx);
  };

  const handleScan = async (data: string) => {
    if (!data.startsWith('hack:')) {
      setScanData(data);
      setSuccess(successStrings.invalidFormat);
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
        const userId = data.split(':')[1];
        const userPayload = await RequestHelper.get<UserProfile>(`/api/userinfo?id=${userId}`, {
          headers: {
            Authorization: user.token!,
          },
        });
        setScannedUserInfo(userPayload.data);
        if (result.status === 404) {
          return setSuccess(successStrings.invalidUser);
        } else if (result.status === 201) {
          return setSuccess(successStrings.alreadyClaimed);
        } else if (result.status === 403) {
          return setSuccess(successStrings.notCheckedIn);
        } else if (result.status !== 200) {
          return setSuccess(successStrings.unexpectedError);
        }
        setSuccess(successStrings.claimed);
      })
      .catch((err) => {
        console.log(err);
        setScanData(data);
        setSuccess('Unexpected error...');
      });
  };

  const updateScan = async () => {
    if (!user.permissions.includes('super_admin')) {
      alert('You do not have the required permission to use this functionality');
      return;
    }
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
    if (!user.permissions.includes('super_admin')) {
      alert('You do not have the required permission to use this functionality');
      return;
    }
    try {
      const newScan = {
        ...newScanForm,
        precedence: scanTypes.length,
      };
      const { status, data } = await RequestHelper.post<any, any>(
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
        alert(data.msg);
      } else {
        alert('Scan added');
        setScanTypes((prev) => [...prev, newScan]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteScan = async () => {
    if (!user.permissions.includes('super_admin')) {
      alert('You do not have the required permission to use this functionality');
      return;
    }
    try {
      const { status, data } = await RequestHelper.post<any, any>(
        '/api/scan/delete',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
        },
        {
          scanData: currentScan,
        },
      );
      setShowDeleteScanDialog(false);
      if (status >= 400) {
        alert(data.msg);
      } else {
        alert(data.msg);
        const newScanTypes = [...scanTypes];
        newScanTypes.splice(currentScanIdx, 1);
        setScanTypes(newScanTypes);
        setCurrentScan(undefined);
        setCurrentScanIdx(-1);
      }
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
    <div className="relative flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section className="p-4">
        <AdminHeader />
      </section>
      {currentScan && (
        <Dialog
          open={showDeleteScanDialog}
          onClose={() => setShowDeleteScanDialog(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className="rounded-2xl relative bg-white flex flex-col justify-between p-4 max-w-sm mx-auto">
              <Dialog.Title>
                Delete <span className="font-bold">{currentScan.name}</span>
              </Dialog.Title>

              <div className="my-7 flex flex-col gap-y-4">
                <Dialog.Description>
                  This is permanently delete <span className="font-bold">{currentScan.name}</span>
                </Dialog.Description>
                <p>Are you sure you want to delete this scan? This action cannot be undone.</p>
              </div>

              <div className="flex flex-row justify-end gap-x-2">
                <button
                  className="rounded-lg p-3 text-red-800 bg-red-100 hover:bg-red-200 border border-red-400"
                  onClick={async () => {
                    await deleteScan();
                  }}
                >
                  Delete
                </button>
                <button
                  className="rounded-lg p-3 bg-gray-200 hover:bg-gray-300 border border-gray-500"
                  onClick={() => setShowDeleteScanDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
      {showNewScanForm ? (
        <div className="px-6 py-4">
          <button
            className="text-primaryDark font-bold md:text-lg text-base flex items-center"
            onClick={() => {
              setShowNewScanForm(false);
            }}
          >
            <ChevronLeftIcon />
            Return to scanner
          </button>
          <div className="text-2xl font-black text-center">Add New Scan</div>
          <div className="w-3/5 my-5 mx-auto">
            <input
              className="p-3 rounded-lg w-full border-[1px] focus:border-primaryDark"
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
              className="mx-auto p-3 rounded-lg font-bold bg-green-200 hover:bg-green-300 border border-green-800 text-green-900"
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
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center md:h-auto max-h-[26rem] max-w-full overflow-y-auto p-2">
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
                <div className="w-full flex justify-center">
                  <LoadIcon width={150} height={150} />
                </div>
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
                        <div
                          className="text-center text-3xl font-black"
                          style={{ color: getSuccessColor(success) }}
                        >
                          <p>{success ?? 'Unexpected error!'}</p>
                          {scannedUserInfo && (
                            <>
                              <p>
                                Name: {scannedUserInfo.user.firstName}{' '}
                                {scannedUserInfo.user.lastName}
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div />
                      )}

                      {scanData ? (
                        <div className="flex m-auto items-center justify-center">
                          <div
                            className="w-min-5 m-3 rounded-lg text-center text-lg font-black p-3 cursor-pointer hover:bg-green-300 border border-green-800 text-green-900"
                            onClick={() => {
                              setScanData(undefined);
                            }}
                          >
                            Next Scan
                          </div>
                          <div
                            className="w-min-5 m-3 rounded-lg text-center text-lg font-black p-3 cursor-pointer hover:bg-green-300 border border-green-800 text-green-900"
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
                            className="p-3 rounded-lg w-full border-[1px] focus:border-primaryDark"
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
                              className="bg-green-200 hover:bg-green-300 border border-green-800 text-green-900 p-3 rounded-lg font-bold"
                              onClick={async () => {
                                await updateScan();
                              }}
                            >
                              Update Scan Info
                            </button>
                            <button
                              className="font-bold p-3 rounded-lg text-red-800 bg-red-100 hover:bg-red-200 border border-red-400"
                              onClick={() => {
                                setEditScan(false);
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
                        className="font-bold bg-green-200 hover:bg-green-300 border border-green-800 text-green-900 rounded-lg md:p-3 p-1 px-2"
                        onClick={() => {
                          setStartScan(true);
                        }}
                      >
                        Start Scan
                      </button>
                      {user.permissions.includes('super_admin') && (
                        <>
                          <button
                            className="font-bold bg-gray-200 hover:bg-gray-300 border border-gray-500 rounded-lg md:p-3 p-1 px-2"
                            onClick={() => {
                              if (!user.permissions.includes('super_admin')) {
                                alert(
                                  'You do not have the required permission to use this functionality',
                                );
                                return;
                              }
                              setCurrentEditScan(currentScan);
                              setEditScan(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="font-bold text-red-800 bg-red-100 hover:bg-red-200 border border-red-400 rounded-lg md:p-3 p-1 px-2"
                            onClick={() => {
                              if (!user.permissions.includes('super_admin')) {
                                alert(
                                  'You do not have the required permission to use this functionality',
                                );
                                return;
                              }
                              if (currentScan.isCheckIn) {
                                alert('Check-in scan cannot be deleted');
                                return;
                              }
                              setShowDeleteScanDialog(true);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <button
                        className="font-bold text-red-800 bg-red-100 hover:bg-red-200 border border-red-400 rounded-lg md:p-3 p-1 px-2"
                        onClick={() => {
                          setCurrentScan(undefined);
                          setCurrentScanIdx(-1);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!currentScan &&
              !editScan &&
              !showDeleteScanDialog &&
              !startScan &&
              user.permissions.includes('super_admin') && (
                <div className="mx-auto my-5">
                  <button
                    className="py-3 px-4 font-bold rounded-lg hover:bg-secondary bg-primaryDark text-secondary hover:text-primaryDark border-[1px] border-transparent hover:border-primaryDark transition duration-300 ease-in-out"
                    onClick={() => {
                      if (!user.permissions.includes('super_admin')) {
                        alert('You do not have the required permission to use this functionality');
                        return;
                      }
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
