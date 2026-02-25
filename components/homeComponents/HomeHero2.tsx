import Image from 'next/image';
import AppHeader2_Wrapper from '../AppHeader2/wrapper';

export default function HomeHero2() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden">
      <Image
        src="/assets/bg-1.png"
        alt="NTHS Hackathon hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10">
        <AppHeader2_Wrapper />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
        <div className="space-y-2">
          <h1
            className="font-['Alfa_Slab_One'] text-white text-[clamp(34px,5vw,86px)] leading-tight"
            style={{
              textShadow: '0 6px 18px rgba(0,0,0,0.5)',
              animation: 'float 8s ease-in-out infinite',
            }}
          >
            NTHS Hackathon
          </h1>
          <p
            className="font-['Alfa_Slab_One'] unbold-text text-white text-[clamp(16px,2vw,30px)]"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          >
            2026 &bull; March 28
          </p>
        </div>
      </div>
    </section>
  );
}
