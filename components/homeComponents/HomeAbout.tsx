export default function HomeAbout() {
  return (
    <section className="md:p-12 p-6 text-complementary">
      <h1 className="md:text-4xl text-2xl font-bold my-4">About HackPortal</h1> {/* !change */}
      <div className="md:text-base text-sm">
        HackPortal is a platform for user-friendly hackathon event management. <br />
        <br />A few of its features include: A fully customizable front end, sign in with email/
        Google, hacker registration, images, challenges, sponsors, FAQ and more fetched from
        backend, push notifications, a spotlight carousel highlighting ongoing events, QR code check
        in and swag claims, report submission/ Ask a question, a built-in and easy to set up
        schedule, Hacker, Admin, and Super Admin roles, an Admin console to send announcements,
        update user roles, show number of check-ins, swag claims, and more!. <br />
        <br />
        To set up HackPortal for your hackathon, check out the{' '}
        <a
          href="https://github.com/acmutd/hackportal/blob/develop/docs/set-up.md"
          className="underline"
        >
          HackPortal Github
        </a>
        !
      </div>
    </section>
  );
}
