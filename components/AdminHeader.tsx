import Link from 'next/link';
import React from 'react';
import { useAuthContext } from '../lib/user/AuthContext';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

/**
 * An about header.
 */
export default function AdminHeader() {
  const { user } = useAuthContext();
  return (
    <section className="p-4">
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 items-center">
        <div className="mx-auto md:flex justify-center text-xl font-header md:text-left  gap-x-8">
          <Link href="/admin">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link font-bold">Event Dashboard</a>
            </a>
          </Link>
          <Link href="/admin/scan">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link font-bold">Scanner</a>
            </a>
          </Link>
          <Link href="/admin/users">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link font-bold">Users Dashboard</a>
            </a>
          </Link>
          {isAuthorized(user) && (
            <Link href="/admin/stats">
              <a>
                <span className="inline md:invisible"></span>
                <a className="link font-bold">Stats at a Glance</a>
              </a>
            </Link>
          )}
        </div>
      </header>
    </section>
  );
}
