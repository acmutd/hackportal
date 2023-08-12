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
            href="mailto:hello@hackutd.co"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline md:mr-8"
          >
            Contact Us
          </a>
          {/* !change */}
          <a
            href="http://hackp.ac/coc"
            target="_blank"
            rel="noreferrer"
            className="hover:underline  whitespace-nowrap"
          >
            Code of Conduct
          </a>
        </div>
        {/* Social icons */} {/* !change */}
        <div className="flex flex-row space-x-8 > * + * mt-2 mb-6">
          <a href="https://discord.gg" rel="noopener noreferrer" target="_blank">
            <svg
              width="28"
              height="21"
              viewBox="0 0 28 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="footerIcon mt-1"
            >
              <path
                d="M23.0876 1.66256C21.4251 0.887557 19.6251 0.325057 17.7501 5.74977e-05C17.7337 -0.000468256 17.7174 0.00261685 17.7022 0.00909595C17.6871 0.015575 17.6736 0.0252908 17.6626 0.0375578C17.4376 0.450058 17.1751 0.987557 17.0001 1.40006C15.0114 1.10006 12.9889 1.10006 11.0001 1.40006C10.8251 0.975057 10.5626 0.450058 10.3251 0.0375578C10.3126 0.0125578 10.2751 5.74977e-05 10.2376 5.74977e-05C8.36265 0.325057 6.57515 0.887557 4.90015 1.66256C4.88765 1.66256 4.87515 1.67506 4.86265 1.68756C1.46265 6.77506 0.525147 11.7251 0.987647 16.6251C0.987647 16.6501 1.00015 16.6751 1.02515 16.6876C3.27515 18.3376 5.43765 19.3376 7.57515 20.0001C7.61265 20.0126 7.65015 20.0001 7.66265 19.9751C8.16265 19.2876 8.61265 18.5626 9.00015 17.8001C9.02515 17.7501 9.00015 17.7001 8.95015 17.6876C8.23765 17.4126 7.56265 17.0876 6.90015 16.7126C6.85015 16.6876 6.85015 16.6126 6.88765 16.5751C7.02515 16.4751 7.16265 16.3626 7.30015 16.2626C7.32515 16.2376 7.36265 16.2376 7.38765 16.2501C11.6876 18.2126 16.3251 18.2126 20.5751 16.2501C20.6001 16.2376 20.6376 16.2376 20.6626 16.2626C20.8001 16.3751 20.9376 16.4751 21.0751 16.5876C21.1251 16.6251 21.1251 16.7001 21.0626 16.7251C20.4126 17.1126 19.7251 17.4251 19.0126 17.7001C18.9626 17.7126 18.9501 17.7751 18.9626 17.8126C19.3626 18.5751 19.8126 19.3001 20.3001 19.9876C20.3376 20.0001 20.3751 20.0126 20.4126 20.0001C22.5626 19.3376 24.7251 18.3376 26.9751 16.6876C27.0001 16.6751 27.0126 16.6501 27.0126 16.6251C27.5626 10.9626 26.1001 6.05006 23.1376 1.68756C23.1251 1.67506 23.1126 1.66256 23.0876 1.66256ZM9.65015 13.6376C8.36265 13.6376 7.28765 12.4501 7.28765 10.9876C7.28765 9.52506 8.33765 8.33756 9.65015 8.33756C10.9751 8.33756 12.0251 9.53756 12.0126 10.9876C12.0126 12.4501 10.9626 13.6376 9.65015 13.6376ZM18.3626 13.6376C17.0751 13.6376 16.0001 12.4501 16.0001 10.9876C16.0001 9.52506 17.0501 8.33756 18.3626 8.33756C19.6876 8.33756 20.7376 9.53756 20.7251 10.9876C20.7251 12.4501 19.6876 13.6376 18.3626 13.6376Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/hackutd/?hl=en"
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon className="footerIcon" />
          </a>
          <a href="https://www.tiktok.com/@hackutd" rel="noopener noreferrer" target="_blank">
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="footerIcon mt-1"
            >
              <path
                d="M12.3947 0.25H9.13565V12.8514C9.13565 14.3529 7.88221 15.5862 6.32234 15.5862C4.76247 15.5862 3.50901 14.3529 3.50901 12.8514C3.50901 11.3768 4.73461 10.1703 6.23879 10.1167V6.95291C2.92405 7.00651 0.25 9.60725 0.25 12.8514C0.25 16.1225 2.97976 18.75 6.3502 18.75C9.72059 18.75 12.4504 16.0957 12.4504 12.8514V6.38984C13.676 7.24783 15.1801 7.75725 16.7679 7.78407V4.62029C14.3167 4.53986 12.3947 2.60942 12.3947 0.25Z"
                fill="#ffffff"
              />
            </svg>
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
