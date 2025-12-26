import BackgroundCircles from '../BackgroundCircles';
import { useAuthContext } from '../../lib/user/AuthContext';
import AppHeader2_Wrapper from '../AppHeader2/wrapper';
import { useRouter } from 'next/router';

export default function HomeHero() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-col section-bg bg-1 bg-cover bg-center overflow-x-hidden">
      {/* App header */}
      <AppHeader2_Wrapper />

      <div className="flex h-screen w-full relative">
        {/* <div className="w-full h-full absolute top-0 left-0 z-0">
          <BackgroundCircles />
        </div> */}

        <div className="relative z-10 shrink-0 w-full flex">
          {/* Big welcome */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
            <div className="text-center transform -translate-y-16 md:-translate-y-28">
              <h1 className="rye-font text-white text-5xl md:text-7xl lg:text-7xl font-bold drop-shadow-2xl leading-tight">
                NTHS Hackathon 2026
              </h1>
              <p className="rye-font text-white text-lg md:text-2xl opacity-95 drop-shadow-lg mt-2">
                March 5th-6th
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
