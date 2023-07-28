import Image from 'next/image';

export default function HomeVideoStats() {
  return (
    <section className="z-0 relative">
      <div className="w-4/5 border-2 border-[#111A31] mx-auto p-1">
        <div className="border-2 border-[#111A31] flex items-stretch">
          {/* Video */}
          {/* !change */}
          <iframe
            className="video border-0"
            width="800"
            height="450"
            src="https://www.youtube.com/embed/f6-Kwfi-CQM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="border-2 grow flex items-center justify-center">
            <div className="w-[17rem] h-[17rem] relative">
              <Image src="/assets/Logo-Dark.png" alt="ecsw" layout="fill" object-fit="fill"></Image>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
