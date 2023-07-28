import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

export default function HomeFooter() {
  return (
    <section className="px-6 py-8 md:text-base text-xs">
      <div className="flex flex-col items-center justify-center gap-2 text-[#FFFCF9] text-center">
        <div className="text-base md:text-lg">
          {' '}
          {/* !change */}
          Checkout HackUTD&apos;s{' '}
          <a
            href="https://acmutd.co/"
            rel="noopener noreferrer"
            target="_blank"
            className="font-black hover:underline"
          >
            Organizer website
          </a>
        </div>
        <div className="text-[0.6rem] md:text-sm my-2">
          Designed by <p className="font-black inline">HackUTD | </p>
          {/* PLEASE DO NOT CHANGE <3 */}
          HackPortal developed with &lt;3 by <p className="font-black inline">HackUTD</p> and{' '}
          <p className="font-black inline">ACM Development</p>
          {/* PLEASE DO NOT CHANGE <3 */}
        </div>
        <div className="flex flex-row justify-center items-center space-x-6">
          {/* !change */}
          <a
            href="mailto:email@organization.com"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline md:mr-8"
          >
            Contact Us
          </a>
          {/* !change */}
          <a
            href="https://github.com/acmutd/hackportal"
            target="_blank"
            rel="noreferrer"
            className="hover:underline  whitespace-nowrap"
          >
            Source Code
          </a>
        </div>
        {/* Social icons */} {/* !change */}
        <div className="space-x-8 > * + * mt-2 mb-6">
          <a
            href="https://www.instagram.com/hackutd/?hl=en"
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon className="footerIcon" />
          </a>
          <a href="https://www.facebook.com/hackutd/" rel="noopener noreferrer" target="_blank">
            <FacebookIcon className="footerIcon" />
          </a>
          <a
            href="https://www.linkedin.com/company/hackutd/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedInIcon className="footerIcon" />
          </a>
          <a href="https://twitter.com/hackutd" rel="noopener noreferrer" target="_blank">
            <TwitterIcon className="footerIcon" />
          </a>
        </div>
      </div>
    </section>
  );
}
