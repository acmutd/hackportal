import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  addClass: PropTypes.string.isRequired,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ href, exact, addClass, children, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  // if (isActive) {
  //   props.className += ' active border-b-2 border-black';
  // }
  if (isActive) {
    props.className += `active ${addClass}`;
  }

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
}

export default NavLink;
