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
      className="flex flex-col-reverse md:flex-col section-bg bg-sky bg-cover bg-center relative"
      style={{ minHeight: '220vh' }}
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
                March 5th-6th
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About NTHS Hack Section - Text pinned to billboard in full-bg.png */}
      <div
        className="about-section-container"
        style={{
          position: 'absolute',
          top: 'clamp(600px, 50vw, 900px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(500px, 60vw, 750px)',
          zIndex: 20,
        }}
      >
        {/* Container matching billboard aspect ratio in full-bg */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2.3 / 1',
          }}
        >
          {/* Text anchored within billboard bounds */}
          <div
            style={{
              position: 'absolute',
              top: '130%',
              left: '40%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              textAlign: 'center' as const,
              color: '#fff',
              textShadow: '0 6px 18px rgba(0,0,0,0.5)',
            }}
          >
            <h1
              style={{
                fontFamily: "'Alfa Slab One', cursive",
                fontWeight: 250,
                fontSize: 'clamp(24px, 3.5vw, 56px)',
                margin: 0,
                marginBottom: 'clamp(20px, 5vw, 60px)',
                transform: 'translateY(-30px)',
              }}
            >
              About NTHS Hack
            </h1>
            <p
              style={{
                fontFamily: "'Alfa Slab One', cursive",
                fontWeight: 200,
                fontSize: 'clamp(8px, 1vw, 13px)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              The Association of Computing Machinery (ACM) at the University of Texas at Dallas will
              be hosting the third iteration of our hackathon experience! This two day long event
              will be an intense competition of self expression and creativity through technology,
              where students will get the chance to showcase their web development skills. High
              school students across North Texas with varying technical backgrounds will come
              together, form teams, and build unique solutions from scratch. This beginner-friendly
              hackathon is an extraordinary opportunity for you to win prizes, compete, and
              jumpstart your journey in technology!
            </p>
          </div>
        </div>
      </div>

      {/* Stats section - same positioning parent as About */}
      <HomeVideoStats />
    </section>
  );
}
