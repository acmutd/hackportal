import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAuthContext } from '@/lib/user/AuthContext';
import { RequestHelper } from '@/lib/request-helper';
import QRCodeReaderV2 from './QRCodeReaderV2';
import QrScanner from 'qr-scanner';
import QRCodeReader from '../dashboardComponents/QRCodeReader';

interface QRScanDialogProps {
  scan: {
    precendence: number;
    name: string;
    isCheckIn: boolean;
    startTime: Date;
    endTime: Date;
    isPermanentScan: boolean;
  } | null;
  onModalClose: () => void;
}

const successStrings = {
  claimed: 'Scan claimed...',
  invalidUser: 'Invalid user...',
  alreadyClaimed: 'User has already claimed...',
  unexpectedError: 'Unexpected error...',
  notCheckedIn: "User hasn't checked in!",
  invalidFormat: 'Invalid hacker tag format...',
  lateCheckinIneligible: 'User is not eligible for late check-in...',
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

export default function QRScanDialog({ scan, onModalClose }: QRScanDialogProps) {
  const [scanData, setScanData] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [userScanned, setUserScanned] = useState(false);
  const { user } = useAuthContext();
  const [scannedUserInfo, setScannedUserInfo] = useState(undefined);

  const handleScan = async (data: string) => {
    if (userScanned) return;
    if (!data.startsWith('hack:')) {
      setScanData(data);
      setSuccess(successStrings.invalidFormat);
      return;
    }
    setUserScanned(true);
    const query = new URL(`http://localhost:3000/api/scan`);
    query.searchParams.append('id', data.replaceAll('hack:', ''));
    await fetch(query.toString().replaceAll('http://localhost:3000', ''), {
      mode: 'cors',
      headers: { Authorization: user.token },
      method: 'POST',
      body: JSON.stringify({
        id: data.replaceAll('hack:', ''),
        scan: scan.name,
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
        } else if (result.status === 400) {
          return setSuccess(successStrings.lateCheckinIneligible);
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

  if (!scan) {
    return <></>;
  }

  return (
    <Transition appear show={scan !== null} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onModalClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {scan.name}
                </Dialog.Title>
                <div className="mt-2">
                  {scanData ? (
                    <div
                      className="text-center text-3xl font-black"
                      style={{ color: getSuccessColor(success) }}
                    >
                      <p>{success ?? 'Unexpected error!'}</p>
                      {scannedUserInfo && (
                        <>
                          <p>
                            Name: {scannedUserInfo.user.firstName} {scannedUserInfo.user.lastName}
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="p-3">
                      <QRCodeReader width={200} height={200} callback={handleScan} />
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setScanData(undefined);
                      setUserScanned(false);
                    }}
                  >
                    Next Scan
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setScanData(undefined);
                      setUserScanned(false);
                      onModalClose();
                    }}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
