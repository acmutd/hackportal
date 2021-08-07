import { AppProps } from 'next/dist/next-server/lib/router/router';
import 'firebase/auth';
import AppHeader from '../components/AppHeader';
import { AuthProvider } from '../lib/user/AuthContext';
import '../styles/globals.css';
import '../styles/tailwind.css';
import { initFirebase } from '../lib/firebase-client';

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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default PortalApp;
