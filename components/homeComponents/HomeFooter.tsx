import React, { SVGProps } from 'react';

//TODO: need to do some media queries for footer, styling is off
export default function HomeFooter() {
  return (
    <section
      style={{
        minHeight: '387px',
        // TODO: need to update box shadow, current box shadow is a bit off from the design
        boxShadow: 'rgba(0, 0, 0, 0.18) 20px -2px 20px',
      }}
      className="bg-6 relative"
    >
      <div className="flex">
        <div className="z-10 grid grid-cols-1 md:grid-cols-3 md:gap-20">
          <div className="lg:text-black pt-14 pl-24">
            <h1 className="font-bold text-2xl ">ACM UTD</h1>
            <h2 className="font-semibold text-xl mt-4 mb-3">Contact Us</h2>
            <div className="flex gap-4 mb-4">
              {/* Instagram icon */}
              <a
                href="https://www.instagram.com/acmutd_outreach/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* LinkedIn icon */}
              <a
                href="https://www.linkedin.com/company/acmutd"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Email icon */}
              <a
                href="mailto:outreach@acmutd.co"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
            <p className="mt-2">
              <a
                href="https://www.acmutd.co/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:opacity-80"
              >
                Check out ACM UTD&apos;s website
              </a>
            </p>
          </div>
          <div className="p-10" style={{ minWidth: '400px', fontFamily: 'inter' }}>
            <h1 className="font-semibold text-xl mb-3">Developed with HackPortal</h1>
            <div className="font-light">
              <p className="mb-2">Learn more</p>
              <p className="mb-2">
                <a
                  href="https://hackutd.co/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Check out HackUTD&apos;s <span className="font-semibold">website</span>
                </a>
              </p>
              <p className="mb-2">
                HackPortal developed with {'<3'} <span className="font-semibold">HackUTD </span>
                and <span className="font-semibold">ACM Development</span>
              </p>
              <p className="mb-2">
                <a
                  href="https://github.com/hackutd/hackportal"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Source Code
                </a>
              </p>
            </div>
          </div>
          {/* <div className="p-10" style={{ maxWidth: '300px', fontFamily: 'inter' }}>
            <h1 className="font-semibold text-xl mb-3">Contact Us</h1>
            <input
              style={{ backgroundColor: '#E2E2E2' }}
              className="border-0 rounded"
              placeholder="Email"
              type="text"
              name="email"
              id="contact-us"
            />
            <button
              className="rounded-lg text-white px-6 py-2 my-4"
              style={{ backgroundColor: '#702D11' }}
            >
              Subscribe
            </button>
          </div> */}
        </div>
      </div>
      <div
        // hardcoded background color for now, but will upgrade to tailwind later
        style={{ height: '37px', width: '100%', backgroundColor: '#702D11' }}
        className="absolute bottom-0 flex items-center justify-center"
      >
        <h2 className="text-center text-white">All Copyrights are reserved by HackUTD</h2>
      </div>
    </section>
  );
}

// blob
const Blob: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="480"
      height="385"
      viewBox="0 0 480 385"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.9788 597.017C129.555 628.73 243.207 655.052 315.874 585.996C387.307 518.112 331.301 394.497 355.612 296.116C385.101 176.784 513.977 73.4295 470.3 -38.9127C425.588 -153.916 283.623 -190.831 166.515 -190.256C63.0498 -189.748 -30.1812 -121.127 -98.5997 -36.1217C-153.192 31.7049 -151.839 124.432 -157.987 212.914C-163.26 288.808 -164.756 363.637 -130.957 429.549C-92.3463 504.843 -37.3878 570.279 38.9788 597.017Z"
        fill="#8B5A2B"
      />
    </svg>
  );
};
