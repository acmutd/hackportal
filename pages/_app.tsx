import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';
import 'firebase/auth';
import AppHeader from '../components/AppHeader';
import { initFirebase } from '../lib/firebase-client';
import { AuthProvider } from '../lib/user/AuthContext';
import '../styles/globals.css';
import '../styles/tailwind.css';
import { FCMProvider } from '../lib/service-worker/FCMContext';

initFirebase();

/**
 * A Wrapper for the HackPortal web app.
 *
 * This is the root of the component heirarchy. When the site is hydrated, this
 * will load into memory and never re-initialize unless the page refreshes.
 */
function PortalApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FCMProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <title>HackPortal</title> {/* !change */}
          <meta name="description" content="Your all-in-one guide to this hackathon." />
          {process.env.ENABLE_PWA ||
            (process.env.NODE_ENV !== 'development' && (
              <link rel="manifest" href="/manifest.json" />
            ))}
          <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <meta name="theme-color" content="#5D5FEF" />
        </Head>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <AppHeader />
          <Component {...pageProps} />
        </div>
      </FCMProvider>
    </AuthProvider>
  );
}

export default PortalApp;
