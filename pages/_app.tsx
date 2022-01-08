import Head from 'next/head';
import { AppProps } from 'next/app';
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
          <title>HackUTD VIII</title>
          <meta
            name="description"
            content="HackUTD VIII - Blast From the Past, a hackathon by ACM UTD."
          />
          {process.env.ENABLE_PWA ||
            (process.env.NODE_ENV !== 'development' && (
              <link rel="manifest" href="/manifest.json" />
            ))}
          <link rel="preload" href="/fonts/streamster.ttf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/outrun-future.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/neon.ttf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/good-times-rg.ttf" as="font" crossOrigin="anonymous" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          ​<link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-icon-192x192.png"
          />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#5D5FEF" />
        </Head>
        <div className="min-h-screen flex flex-col bg-black">
          <AppHeader />
          <Component {...pageProps} />
        </div>
      </FCMProvider>
    </AuthProvider>
  );
}

export default PortalApp;
