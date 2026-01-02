import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import BackgroundCircles from '../BackgroundCircles';
import { useAuthContext } from '../../lib/user/AuthContext';
import AppHeader2_Wrapper from '../AppHeader2/wrapper';
import { useRouter } from 'next/router';

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
      className="flex flex-col-reverse md:flex-col section-bg bg-sky bg-cover bg-center overflow-hidden relative"
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
              className="text-center transform -translate-y-34 md:-translate-y-50"
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

      {/* About NTHS Hack Section - above foreground */}
      <div
        className="absolute w-full"
        style={{
          top: '105vh',
          height: '120vh',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div className="section-bg bg-2 w-full h-full relative">
          {/* text overlay INSIDE billboard */}
          <div
            style={{
              position: 'absolute',
              left: '44%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
              width: '50%',
              maxWidth: '550px',
              textAlign: 'center' as const,
              color: '#fff',
              textShadow: '0 6px 18px rgba(0,0,0,0.5)',
              zIndex: 20,
              pointerEvents: 'none' as const,
            }}
          >
            <h1
              style={{
                fontFamily: "'Alfa Slab One', cursive",
                fontWeight: 250,
                fontSize: 'clamp(28px, 4vw, 68px)',
                margin: 0,
                transform: 'translateY(-72px)',
              }}
            >
              About NTHS Hack
            </h1>
            <p
              style={{
                fontFamily: "'Alfa Slab One', cursive",
                fontWeight: 200,
                fontSize: 'clamp(8px, 1.2vw, 22px)',
                lineHeight: 1.5,
                marginTop: '12px',
                maxHeight: '42vh',
                overflow: 'hidden',
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
    </section>
  );
}
