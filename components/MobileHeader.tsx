import HackUTDLogo from './HackUTDLogo';
import { useState } from 'react';

export default function MobileHeader(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="SidebarMobile">
      <a className="logo" onClick={() => setOpen(!open)}>
        <HackUTDLogo />
      </a>
      {open && props.children}
    </div>
  );
}
