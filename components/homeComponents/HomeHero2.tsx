import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import BackgroundCircles from '../BackgroundCircles';
import { useAuthContext } from '../../lib/user/AuthContext';
import AppHeader2_Wrapper from '../AppHeader2/wrapper';
import { useRouter } from 'next/router';
import HomeVideoStats from './HomeVideoStats';

export default function HomeHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroHeight = window.innerHeight;
          if (window.scrollY < heroHeight) {
            setScrollY(window.scrollY);
          } else {
            setScrollY(heroHeight);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="flex flex-col-reverse md:flex-col section-bg bg-sky bg-cover bg-center relative homeHeroMobileFix"
      style={{
        minHeight: '220vh',
        height: 'auto',
      }}
    >
      {/* Parallax Sky Background */}
      <div
        className="parallax-sky"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Parallax Foreground */}
      <div
        className="parallax-foreground"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 1,
        }}
      />

      {/* App header */}
      <div className="relative z-10">
        <AppHeader2_Wrapper />
      </div>

      <div className="flex h-screen w-full relative">
        {/* <div className="w-full h-full absolute top-0 left-0 z-0">
          <BackgroundCircles />
        </div> */}

        <div className="relative z-10 shrink-0 w-full flex">
          {/* Big welcome */}
          <div className="absolute inset-0 z-10 flex items-center mb-24 justify-center pointer-events-none px-4">
            <div
              className="text-center transform -translate-y-10 sm:-translate-y-20 md:-translate-y-50"
              style={{
                animation: 'float 5s ease-in-out infinite',
              }}
            >
              <h1 className="rye-font text-white text-5xl md:text-7xl lg:text-7xl font-bold drop-shadow-2xl leading-tight">
                NTHS Hackathon 2026
              </h1>
              <p className="rye-font text-white text-lg md:text-2xl opacity-95 drop-shadow-lg mt-2">
                March 28th
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
