import { useAuthContext } from '../lib/user/AuthContext';
import NavLink from './NavLink';

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
      <header className="top-0 sticky flex flex-row justify-between p-2 md:p-4 items-center text-black">
        <div className="mx-auto md:flex justify-center text-xl font-header md:text-left">
          <NavLink href="/admin" exact={true} className="mx-4">
            Event Dashboard
          </NavLink>
          <NavLink href="/admin/scan" exact={true} className="mx-4">
            Scanner
          </NavLink>
          <NavLink href="/admin/users" exact={true} className="mx-4">
            Users Dashboard
          </NavLink>
          {isAuthorized(user) && (
            <NavLink href="/admin/stats" exact={true} className="mx-4">
              Stats at a Glance
            </NavLink>
          )}
        </div>
      </header>
    </section>
  );
}
