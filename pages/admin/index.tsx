import Head from 'next/head';
import React from 'react';
import AdminHeader from '../../components/AdminHeader';
import { useAuthContext } from '../../lib/user/AuthContext';

export function isAuthorized(user): boolean {
  return user.permissions.includes('admin') || user.permissions.includes('organizer');
}

/**
 * The about page.
 *
 * Landing: /about
 */
export default function Admin() {
  const { user, isSignedIn } = useAuthContext();
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
      <div className="top-6">
        <h4>About</h4>
        <h5>Hackathon About info here</h5>
      </div>
    </div>
  );
}
