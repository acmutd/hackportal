import { useRouter } from 'next/router';
import { buttonDatas } from '../../lib/data';

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="min-h-screen p-4 bg-contain bg-white">
      <div
        style={{ minHeight: 480 }}
        className="max-w-4xl mx-auto flex flex-col justify-center items-center"
      >
        <h1 className="text-center md:text-8xl text-6xl font-bold text-primaryDark">HackPortal</h1>{' '}
        {/* !change */}
        <p className="text-center my-4 font-semibold md:text-xl text-md text-primaryDark opacity-80">
          {' '}
          {/* !change */}Powered by HackUTD and ACM Dev
        </p>
      </div>
      {/* TODO: Programmatically show these based on configured times/organizer preference */}

      <div className="flex flex-col items-center md:flex-row md:justify-around px-44 md:space-y-0 space-y-3 > *">
        {buttonDatas.map((button) => (
          <button
            key={button.text}
            onClick={() => router.push(button.path)}
            className="max-w-[14rem] w-[14rem] md:max-w-full bg-white py-4 rounded-xl h-10 flex items-center justify-center font-semibold text-xl text-primaryDark border-2 border-gray-300"
          >
            {button.text}
          </button>
        ))}
      </div>
    </section>
  );
}
