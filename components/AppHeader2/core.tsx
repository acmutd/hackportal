import { useAuthContext } from '@/lib/user/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import AdminNavbarColumn from './AdminNavbarColumn';
import { useRouter } from 'next/router';
import AdminNavbarGrid from './AdminNavbarGrid';
import { RequestHelper } from '@/lib/request-helper';
import QRScanDialog from './QRScanDialog';

type Scan = {
  precendence: number;
  name: string;
  isCheckIn: boolean;
  startTime: Date;
  endTime: Date;
  isPermanentScan: boolean;
};

export default function AppHeader2_Core() {
  const { user, hasProfile } = useAuthContext();
  const router = useRouter();
  const isSuperAdmin = user ? user.permissions.indexOf('super_admin') !== -1 : false;
  const isAdmin = isSuperAdmin || (user ? user.permissions.indexOf('admin') !== -1 : false);
  const [scanList, setScanList] = useState<Scan[]>([]);
  const [currentScan, setCurrentScan] = useState<Scan | null>(null);
  useEffect(() => {
    if (!isAdmin) {
      setScanList([]);
    }
    async function getScanData() {
      const scans = await RequestHelper.get<Scan[]>('/api/scantypes', {
        headers: {
          authorization: user?.token || '',
        },
      });
      setScanList(scans.data);
    }
    getScanData();
  }, [user, isAdmin]);
  return (
    <div className="flex justify-center py-2 w-full">
      {/* Real navbar */}
      <div className="font-dmSans flex items-center gap-4 border-[3px] border-[rgba(30,30,30,0.60)] rounded-xl px-20 lg:px-[8rem] bg-white relative">
        <Link href="/" className="p-2 text-[#5D5A88] cursor-pointer">
          Home
        </Link>
        <Link href="/#schedule-section" className="p-2 text-[#5D5A88] cursor-pointer">
          Schedule
        </Link>
        <Link href="/hackerpacks" className="p-2 text-[#5D5A88] cursor-pointer">
          Resources
        </Link>
        <Link href="/#faq-section" className="p-2 text-[#5D5A88] cursor-pointer">
          FAQ
        </Link>

        <QRScanDialog scan={currentScan} onModalClose={() => setCurrentScan(null)} />

        {isAdmin && (
          <Menu as="div" className="w-full">
            <div>
              <Menu.Button className="p-2 cursor-pointer flex items-center gap-x-2">
                <div className="text-[#5D5A88]">Admin</div>
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#5D5A88"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-x divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none flex">
                {isSuperAdmin && (
                  <div className="px-1 py-1 w-1/4">
                    <AdminNavbarColumn
                      sectionTitle="Admin"
                      options={[
                        {
                          optionName: 'User Dashboard',
                          onClick: () => router.push('/admin/users'),
                        },
                        {
                          optionName: 'Stats at a Glance',
                          onClick: () => router.push('/admin/stats'),
                        },
                      ]}
                    />
                  </div>
                )}
                <div className="w-1/2 px-1 py-1">
                  <AdminNavbarGrid
                    numCols={3}
                    sectionTitle="Temporary Scans"
                    options={scanList
                      .filter((scan) => !scan.isPermanentScan)
                      .map((scan) => ({
                        optionName: scan.name,
                        onClick: () => setCurrentScan(scan),
                      }))}
                  />
                </div>
                <div className="px-1 py-1">
                  <AdminNavbarColumn
                    sectionTitle="Permanent Scans"
                    options={scanList
                      .filter((scan) => scan.isPermanentScan)
                      .map((scan) => ({
                        optionName: scan.name,
                        onClick: () => setCurrentScan(scan),
                      }))}
                  />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}

        <div className="p-2 text-white cursor-pointer">
          {/* if not signed in send to auth */}
          {!user && (
            <Link href="/auth">
              <div className="py-3 px-5 rounded-[30px] bg-[#5D5A88] font-bold">Apply</div>
            </Link>
          )}
          {/* if signed in but no profile go to register */}
          {user && !hasProfile && (
            <Link href="/register">
              <div className="py-3 px-5 rounded-[30px] bg-[#5D5A88] font-bold">Apply</div>
            </Link>
          )}
          {user && hasProfile && (
            <Link href="/profile">
              <div className="py-3 px-5 rounded-[30px] bg-[#5D5A88] font-bold">Profile</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
