import Link from 'next/link';

export default function custom404() {
  return (
    <>
      <div className="background404 h-screen flex items-center">
        <div className="md:text-3xl sm:text-2xl text-xl text-white xl:px-24 md:px-16 px-4">
          <p>
            Oops! It seems like you took <em>to infinite and beyond</em> a little too literally!
          </p>
          <Link href="/" passHref={true}>
            <div className="cursor-pointer md:text-xl sm:text-lg text-base mt-6 underline raise font-light inline-block">
              Return to home page
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
