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
import { PlusIcon } from '@heroicons/react/solid';

const successStrings = {
  claimed: 'Scan claimed...',
  invalidUser: 'Invalid user...',
  alreadyClaimed: 'User has already claimed...',
  unexpectedError: 'Unexpected error...',
  notCheckedIn: "User hasn't checked in!",
  invalidFormat: 'Invalid hacker tag format...',
};

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

  // Flag whether the current scan types to display are normal or swag
  const [currentScanType, setCurrentScanType] = useState<'normal' | 'swag'>('normal');

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
    netPoints: 0,
    isSwag: false,
    isReclaimable: false,
  });
  const [startScan, setStartScan] = useState(false);

  const [editScan, setEditScan] = useState(false);
  const [currentEditScan, setCurrentEditScan] = useState(undefined);

  const [showDeleteScanDialog, setShowDeleteScanDialog] = useState(false);

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
        isSwag: currentScan.isSwag,
        netPoints: currentScan.netPoints,
        isReclaimable: currentScan.isReclaimable,
      }),
    })
      .then(async (result) => {
        setScanData(data);
        const resData = await result.json();
        if (result.status === 404) {
          return setSuccess(successStrings.invalidUser);
        } else if (result.status === 201) {
          return setSuccess(successStrings.alreadyClaimed);
        } else if (result.status === 403) {
          return setSuccess(successStrings.notCheckedIn);
        } else if (result.status === 418) {
          return setSuccess(resData.message);
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
          oldScanName: currentScan.name,
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
        setNewScanForm({
          name: '',
          isCheckIn: false,
          netPoints: 0,
          isSwag: false,
          isReclaimable: false,
        });
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
    return (
      <div className="bg-[url('/assets/hero-bg.png')] flex flex-col flex-grow text-2xl text-primary text-center pt-4">
        Unauthorized
      </div>
    );

  const normalScans = [];
  const swagScans = [];
  if (scanTypes)
    scanTypes.forEach((scan) => {
      if (scan.isSwag) swagScans.push(scan);
      else normalScans.push(scan);
    });
  const currentScans = currentScanType === 'normal' ? normalScans : swagScans;
  return (
    <div className="relative flex flex-col flex-grow bg-[url('/assets/hero-bg.png')]">
      <Head>
        <title>HackUTD X - Admin</title>
        <meta name="description" content="HackUTD X's Admin Page" />
      </Head>
      <section className="p-4">
        <AdminHeader />
      </section>
      <div className="flex flex-col items-center w-full justify-center">
        <div className="w-full max-w-[57.5rem] px-6">
          <h1 className="text-left mt-4 mb-4 text-3xl font-black text-secondary">Scan Types</h1>
          {!currentScan &&
            !editScan &&
            !showDeleteScanDialog &&
            !startScan &&
            user.permissions.includes('super_admin') && (
              <div className="mx-auto my-5 w-full flex">
                {[
                  /*'Normal', 'Swag'*/
                ].map((t) => (
                  <button
                    key={t}
                    className="py-4 px-4 mr-8 flex font-bold rounded-2xl hover:bg-secondary bg-primaryDark text-secondary hover:text-primaryDark border-[1px] border-transparent hover:border-primaryDark transition duration-300 ease-in-out"
                    onClick={() => {
                      setCurrentScanType(t.toLowerCase() as 'normal' | 'swag');
                    }}
                  >
                    <div className="hidden md:inline-block">{t}</div>
                  </button>
                ))}
                <button
                  className="py-4 px-4 flex ml-auto font-bold rounded-full hover:bg-secondary bg-primaryDark text-secondary hover:text-primaryDark border-[1px] border-transparent hover:border-primaryDark transition duration-300 ease-in-out"
                  onClick={() => {
                    if (!user.permissions.includes('super_admin')) {
                      alert('You do not have the required permission to use this functionality');
                      return;
                    }
                    setShowNewScanForm(true);
                  }}
                >
                  <PlusIcon className="w-6 h-6 md:mr-2" />
                  <div className="hidden md:inline-block">Add Scan</div>
                </button>
              </div>
            )}
          {currentScan && (
            <Dialog
              open={showDeleteScanDialog}
              onClose={() => setShowDeleteScanDialog(false)}
              className="fixed z-10 inset-0 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen p-2">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="rounded-2xl relative bg-primaryDark text-secondary flex flex-col justify-between p-4 max-w-sm mx-auto">
                  <Dialog.Title>
                    Delete <span className="font-bold">{currentScan.name}</span>
                  </Dialog.Title>

                  <div className="my-7 flex flex-col gap-y-4">
                    <Dialog.Description>
                      This is permanently delete{' '}
                      <span className="font-bold">{currentScan.name}</span>
                    </Dialog.Description>
                    <p>Are you sure you want to delete this scan? This action cannot be undone.</p>
                  </div>

                  <div className="flex flex-row justify-end gap-x-2">
                    <button
                      className="rounded-lg p-3 bg-tertiary text-secondary"
                      onClick={async () => {
                        await deleteScan();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="rounded-lg p-3 bg-tertiary saturate-50 text-secondary"
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
              <div className="text-2xl font-black text-left mt-4 text-secondary">Add New Scan</div>
              <div className="mt-6">
                <input
                  className="p-3 rounded-lg w-full border focus:border-primaryDark bg-secondaryDark text-primary"
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
                <div className="flex flex-row items-center gap-x-2 my-4">
                  <h1 className="flex-grow text-secondary">
                    How many points should this award/cost?
                  </h1>
                  <input
                    type="number"
                    id="netPoints"
                    name="netPoints"
                    className="p-3 rounded-lg border focus:border-primaryDark bg-secondaryDark text-primary"
                    onKeyPress={(e) => !/^(\-|[0-9])/.test(e.key) && e.preventDefault()}
                    onChange={(e) =>
                      setNewScanForm((prev) => ({
                        ...prev,
                        netPoints: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="flex flex-row items-center gap-x-2 my-4">
                  <input
                    type="checkbox"
                    id="isCheckin"
                    name="isCheckin"
                    className="mr-2 rounded-md text-secondaryDark focus:ring-0 border border-primary"
                    checked={newScanForm.isCheckIn}
                    onChange={(e) => {
                      setNewScanForm((prev) => ({
                        ...prev,
                        isCheckIn: e.target.checked,
                      }));
                    }}
                  />
                  <h1 className="text-secondary">Is this for check-in event?</h1>
                </div>
                <div className="flex flex-row items-center gap-x-2 my-4">
                  <input
                    type="checkbox"
                    id="isSwag"
                    name="isSwag"
                    className="mr-2 rounded-md text-secondaryDark focus:ring-0 border border-primary"
                    checked={newScanForm.isSwag}
                    onChange={(e) => {
                      setNewScanForm((prev) => ({
                        ...prev,
                        isSwag: e.target.checked,
                      }));
                    }}
                  />
                  <h1 className="text-secondary">Is this for swag?</h1>
                </div>
                <div className="flex flex-row items-center gap-x-2 my-4">
                  <input
                    type="checkbox"
                    id="isReclaimable"
                    name="isReclaimable"
                    className="mr-2 rounded-md text-secondaryDark focus:ring-0 border border-primary"
                    checked={newScanForm.isReclaimable}
                    onChange={(e) => {
                      setNewScanForm((prev) => ({
                        ...prev,
                        isReclaimable: e.target.checked,
                      }));
                    }}
                  />
                  <h1 className="text-secondary">Is this reclaimable?</h1>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <div className="flex flex-row gap-x-3">
                  <button
                    className="bg-primaryDark text-secondary p-3 rounded-lg font-bold"
                    onClick={async () => {
                      await createNewScan();
                    }}
                  >
                    Add Scan
                  </button>
                  <button
                    className="font-bold p-3 rounded-lg bg-tertiary text-secondary text-sm md:text-base"
                    onClick={() => {
                      setShowNewScanForm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center ">
                <div className="flex flex-col gap-3 w-full justify-center max-w-[57.5rem]">
                  {scansFetched &&
                    currentScan === undefined &&
                    scanTypes.map((d, idx) => (
                      <ScanType
                        key={d.name}
                        data={d}
                        name={d.name}
                        onClick={() => handleScanClick(d, idx)}
                      />
                    ))}
                  {!scansFetched && (
                    <div className="w-full flex justify-center">
                      <LoadIcon width={150} height={150} />
                    </div>
                  )}
                </div>

                {currentScan && (
                  <div className="my-6 w-full">
                    <div className="flex flex-col gap-y-4">
                      <div className="text-center text-xl font-black text-secondary">
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
                              {success ?? 'Unexpected error!'}
                            </div>
                          ) : (
                            <div />
                          )}

                          {scanData ? (
                            <div className="flex m-auto items-center justify-center">
                              <div
                                className="w-min-5 m-3 rounded-lg text-center text-lg font-black p-3 cursor-pointer bg-primaryDark text-white"
                                onClick={() => {
                                  setScanData(undefined);
                                }}
                              >
                                Next Scan
                              </div>
                              <div
                                className="w-min-5 m-3 rounded-lg text-center text-lg font-black p-3 cursor-pointer bg-secondaryDark text-primary"
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
                          <div className="py-4">
                            <div className="mt-6">
                              <input
                                className="p-3 rounded-lg w-full border focus:border-primaryDark bg-secondaryDark text-primary"
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
                            </div>
                            <div className="flex flex-row items-center gap-x-2 my-4">
                              <h1 className="flex-grow text-secondary">
                                How many points should this award/cost?
                              </h1>
                              <input
                                type="number"
                                id="netPoints"
                                name="netPoints"
                                className="p-3 rounded-lg border focus:border-primaryDark bg-secondaryDark text-primary"
                                onKeyPress={(e) => !/^(\-|[0-9])/.test(e.key)}
                                value={currentEditScan.netPoints}
                                onChange={(e) =>
                                  setCurrentEditScan((prev) => ({
                                    ...prev,
                                    netPoints: parseInt(e.target.value),
                                  }))
                                }
                              />
                            </div>
                            <div className="flex flex-row items-center gap-x-2 my-4">
                              <input
                                type="checkbox"
                                id="isCheckin"
                                name="isCheckin"
                                className="mr-2 rounded-md text-secondaryDark focus:ring-0 border border-primary"
                                checked={currentEditScan.isCheckIn}
                                onChange={(e) => {
                                  setCurrentEditScan((prev) => ({
                                    ...prev,
                                    isCheckIn: e.target.checked,
                                  }));
                                }}
                              />
                              <h1 className="text-secondary">Is this for check-in event?</h1>
                            </div>
                            <div className="flex flex-row items-center gap-x-2 my-4">
                              <input
                                type="checkbox"
                                id="isSwag"
                                name="isSwag"
                                className="mr-2 rounded-md text-secondaryDark focus:ring-0 border border-primary"
                                checked={currentEditScan.isSwag}
                                onChange={(e) => {
                                  setCurrentEditScan((prev) => ({
                                    ...prev,
                                    isSwag: e.target.checked,
                                  }));
                                }}
                              />
                              <h1 className="text-secondary">Is this for swag?</h1>
                            </div>
                            <div className="flex flex-row items-center gap-x-2 my-4">
                              <input
                                type="checkbox"
                                id="isReclaimable"
                                name="isReclaimable"
                                className="mr-2 rounded-md text-secondaryDark focus:ring-0 border border-primary"
                                checked={currentEditScan.isReclaimable}
                                onChange={(e) => {
                                  setCurrentEditScan((prev) => ({
                                    ...prev,
                                    isReclaimable: e.target.checked,
                                  }));
                                }}
                              />
                              <h1 className="text-secondary">Is this reclaimable?</h1>
                            </div>
                            <div className="flex justify-end mt-8">
                              <div className="flex flex-row gap-x-3">
                                <button
                                  className="bg-primaryDark text-secondary p-3 rounded-lg font-bold text-sm md:text-base"
                                  onClick={async () => {
                                    await updateScan();
                                  }}
                                >
                                  Update Scan Info
                                </button>
                                <button
                                  className="font-bold p-3 rounded-lg bg-tertiary text-secondary text-sm md:text-base"
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
                            className="font-bold bg-primaryDark text-secondary rounded-lg md:p-3 p-1 px-2"
                            onClick={() => {
                              setStartScan(true);
                            }}
                          >
                            Start Scan
                          </button>
                          {user.permissions.includes('super_admin') && (
                            <>
                              <button
                                className="font-bold bg-secondaryDark text-primary rounded-lg md:p-3 p-1 px-2"
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
                                className="font-bold bg-tertiary text-secondary rounded-lg md:p-3 p-1 px-2"
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
                            className="font-bold bg-tertiary text-secondary rounded-lg md:p-3 p-1 px-2"
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
