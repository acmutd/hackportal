import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import KeynoteSpeaker from './KeynoteSpeaker';

export default function HomeSpeakers(props: { keynoteSpeakers: KeynoteSpeaker[] }) {
  const [speakers, setSpeakers] = useState<KeynoteSpeaker[]>([]);

  const colorSchemes: ColorScheme[] = [
    {
      light: '#F2F3FF',
      dark: '#C1C8FF',
    },
    {
      light: '#D8F8FF',
      dark: '#B0F1FF',
    },
    {
      dark: '#FCD7FF',
      light: '#FDECFF',
    },
  ];

  useEffect(() => {
    setSpeakers(props.keynoteSpeakers);
  }, []);

  return (
    speakers.length != 0 && (
      <section className=" overflow-x-auto min-h-[24rem]">
        <div className="flex items-start justify-start font-bold md:p-12 p-6 md:text-4xl text-2xl my-4 text-complementary">
          Speakers
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
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: true,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
              centeredSlides: true,
            },
            620: {
              slidesPerView: 2,
              spaceBetween: 30,
              navigation: true,
            },
            // when window width is >= 640px
            840: {
              slidesPerView: 2,
              spaceBetween: 40,
              navigation: true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              navigation: true,
            },
          }}
        >
          {speakers.map(({ name, description, fileName }, idx) => (
            <SwiperSlide key={idx}>
              <KeynoteSpeaker
                name={name}
                description={description}
                cardColor={colorSchemes[idx % 3]}
                imageLink={fileName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    )
  );
}
