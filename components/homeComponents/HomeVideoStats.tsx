import Image from 'next/image';

export default function HomeVideoStats() {
  return (
    <section className="z-0 relative flex justify-center">
      <div className="2xl:w-3/5 lg:w-4/5 w-auto border-2 border-[#111A31] mx-auto p-1 inline-block">
        <div className="border-2 border-[#111A31] lg:flex items-stretch w-auto">
          {/* Video */}
          {/* !change */}
          <iframe
            className="video border-0 2xl:w-[800px] 2xl:h-[450px] xl:w-[720px] xl:h-[405px] md:w-[592px] md:h-[333px] sm:w-[544px] sm:h-[306px] w-[384px] h-[216px]"
            // width="800"
            // height="450"
            src="https://www.youtube.com/embed/f6-Kwfi-CQM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="border-2 grow lg:flex items-center justify-center hidden">
            <div className="2xl:w-[18rem] 2xl:h-[18rem] xl:w-[15rem] xl:h-[15rem] w-[12rem] h-[12rem] relative">
              <Image src="/assets/Logo-Dark.png" alt="ecsw" layout="fill" object-fit="fill"></Image>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
