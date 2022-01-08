import Link from 'next/link';

export default function MobileLinks() {
  return (
    <div className="SidebarLinks" id="SidebarLinks">
      <Link href="/schedule">
        <div className="link">
          <span className="scheduledot"></span>
          <a>Schedule</a>
        </div>
      </Link>
      <Link href="/speakers">
        <div className="link">
          <span className="speakerdot"></span>
          <a>Speakers</a>
        </div>
      </Link>
      <Link href="/sponsorship-packet.pdf">
        <div className="link">
          <span className="sponsordot"></span>
          <a>Sponsors</a>
        </div>
      </Link>
      <Link href="/about">
        <div className="link">
          <span className="faqdot"></span>
          <a>FAQ</a>
        </div>
      </Link>
      <button className="SigninButton">Sign-in</button>
    </div>
  );
}
