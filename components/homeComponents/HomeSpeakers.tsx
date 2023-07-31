import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import KeynoteSpeaker from './KeynoteSpeaker';

export default function HomeSpeakers(props: { keynoteSpeakers: KeynoteSpeaker[] }) {
  const [speakers, setSpeakers] = useState<KeynoteSpeaker[]>([]);

  useEffect(() => {
    setSpeakers(props.keynoteSpeakers);
  }, []);

  return (
    speakers.length != 0 && (
      <section className=" overflow-x-auto min-h-[24rem] lg:mt-28 my-16 text-[#111A31] 2xl:w-3/5 w-4/5 mx-auto">
        <div className="text-center font-bold lg:text-5xl md:text-3xl text-2xl my-4 mb-8 xl:mb-12 2xl:mb-16">
          FEATURING TALKS FROM
        </div>

        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={10}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // 620: {
            //   slidesPerView: 2,
            //   spaceBetween: 30,
            // },
            // when window width is >= 640px
            840: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {speakers.map(({ name, subtitle, description, fileName }, idx) => (
            <SwiperSlide key={idx}>
              <KeynoteSpeaker
                name={name}
                subtitle={subtitle}
                description={description}
                imageLink={fileName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    )
  );
}
