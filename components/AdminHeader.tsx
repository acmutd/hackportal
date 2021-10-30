import Link from 'next/link';
import React from 'react';

/**
 * An about header.
 */
export default function AdminHeader() {
  return (
    <>
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 bg-white shadow-md items-center">
        <div className="md:flex justify-center text-xl font-header md:text-left">
          <Link href="/admin">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">Admin</a>
            </a>
          </Link>
          <Link href="/admin/scan">
            <a>
              <span className="inline md:invisible"></span>
              <a className="link">Scanner</a>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
