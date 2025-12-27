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
      className="bg-9 mt-16 md:text-base text-xs relative"
    >
      <div className="flex">
        <Blob width={400} className="absolute hidden left-0 top-0 lg:block" />
        <div className="z-10 grid grid-cols-1 lg:gap-36 lg:grid-cols-3">
          <div className="lg:text-white p-10">
            <h1 className="font-bold text-2xl mt-10">HackPortal</h1>
            <p style={{ maxWidth: '300px' }} className="mt-1">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
              officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
              amet.
            </p>
            {/* social media here */}
          </div>
          <div className="p-10" style={{ minWidth: '400px', fontFamily: 'inter' }}>
            <h1 className="font-semibold text-xl mb-3">Learn more</h1>
            <div className="font-light">
              <p className="mb-2">
                Check out HackUTD’s <span className="font-semibold">organizer website</span>
              </p>
              <p className="mb-2">
                Designed by <span className="font-semibold">HackUTD</span>
              </p>
              <p className="mb-2">
                HackPortal developed with {'<3'} <span className="font-semibold">HackUTD </span>
                and <span className="font-semibold">ACM Development</span>
              </p>
              <p className="mb-2">Source Code</p>
            </div>
          </div>
          <div className="p-10" style={{ maxWidth: '300px', fontFamily: 'inter' }}>
            <h1 className="font-semibold text-xl mb-3">Contact Us</h1>
            {/* input for email */}
            <input
              style={{ backgroundColor: '#E2E2E2' }}
              className="border-0 rounded"
              placeholder="Email"
              type="text"
              name="email"
              id="contact-us"
            />
            {/* subscribe button */}
            <button
              className="rounded-lg text-white px-6 py-2 my-4"
              style={{ backgroundColor: '#8B5A2B' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div
        // hardcoded background color for now, but will upgrade to tailwind later
        style={{ height: '37px', width: '100%', backgroundColor: '#8B5A2B' }}
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
