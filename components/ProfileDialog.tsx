import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotesIcon from '@material-ui/icons/Notes';
import { useAuthContext } from '../lib/user/AuthContext';

/**
 * Component properties for a ProfileDialog.
 */
interface ProfileDialogProps {
  /**
   * A callback triggered when the dialog should be dismissed.
   */
  onDismiss: () => void;
}

const ROLE_MAPPINGS: Record<UserPermission, string> = {
  hacker: 'Hacker',
  admin: 'Event Administrator',
  sponsor: 'Event Sponsor',
  organizer: 'Event Organizer',
  judge: 'Judge',
};

/**
 * A dialog that has quick links to actions in the app.
 *
 * It supports:
 * - Link to profile
 * - Sign in/Sign out
 */
export default function ProfileDialog({ onDismiss }: ProfileDialogProps) {
  const { user, isSignedIn } = useAuthContext();
  let name: string;
  let role: string;
  if (user != null) {
    const { firstName, lastName, permissions } = user;

    name = `${firstName} ${lastName}`;
    // TODO: Come up with more robust way of implementing this
    role = permissions && permissions.length > 0 ? ROLE_MAPPINGS[permissions[0]] : 'Hacker';
  } else {
    name = 'Guest';
    role = 'User';
  }

  return (
    <div className="absolute top-8 right-8 min-w-xl max-w-2xl shadow-md rounded-md bg-gray-900">
      {/* TODO: Don't show specific UI unless signed in */}
      <div className="flex px-4 pt-4 pb-2">
        {/* TODO: Handle default undefined photo URL with default */}
        {user && user.photoUrl && (
          <Image
            className="rounded-full object-cover"
            src={user.photoUrl}
            height={64}
            width={64}
            alt="Your profile"
          />
        )}
        {(isSignedIn && (
          <div className="ml-4 py-2 mr-4">
            <div className="text-lg font-bold">{name}</div>
            <div className="text-md">{role}</div>
          </div>
        )) || (
          <div className="p-4 text-lg font-bold">
            Sign in to add events to your schedule, check in, and more!
          </div>
        )}
      </div>
      {(isSignedIn && (
        <>
          <div onClick={onDismiss}>
            <Link href="/profile">
              <a className="block p-4 hover:bg-black">
                <NotesIcon />
                <span className="ml-4">Your profile</span>
              </a>
            </Link>
          </div>
          <div className="rounded-b-md" onClick={onDismiss}>
            <Link href="/auth/signOut">
              <a className="block p-4 hover:bg-black rounded-b-md">
                <ExitToAppIcon />
                <span className="ml-4">Sign out</span>
              </a>
            </Link>
          </div>
        </>
      )) || (
        <div className="rounded-b-md" onClick={onDismiss}>
          <Link href="/auth">
            <a className="block p-4 hover:bg-black rounded-b-md">
              {/* TODO: Swap with better icon */}
              <ExitToAppIcon />
              <span className="ml-4">Sign in</span>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
