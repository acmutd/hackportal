import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Scan() {
  const canvas = useRef(null);
  const { user, isSignedIn } = useAuthContext();
  const [error, setError] = useState('');
  const fetchQR = () => {
    if (!isSignedIn) return;
    const query = new URL(`http://localhost:3000/api/applications/${user.id}`);
    query.searchParams.append('token', user.token);
    query.searchParams.append('id', user.id);
    fetch(query.toString(), {
      mode: 'cors',
      headers: { Authorization: user.token },
      method: 'GET',
    }).then(async (result) => {
      if (result.status !== 200) {
        return setError('QR fetch failed. Please contact an event organizer.');
      }
      const data = await result.json();
      qr.toCanvas(canvas.current, data.id).then(() => setError(''));
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Scan-In" />
      </Head>
      <section id="subheader" className="p-4">
        <DashboardHeader />
      </section>
      {isSignedIn ? (
        <div className="top-6 flex flex-col items-center justify-center">
          <div>
            <h4 className="text-center text-xl" onClick={fetchQR}>
              Scan-In
            </h4>
            <span className="text-center text-lg">{error}</span>
          </div>
          <canvas ref={canvas}></canvas>
        </div>
      ) : (
        <div className="top-6">
          <h4>Invalid Login</h4>
        </div>
      )}
    </div>
  );
}
