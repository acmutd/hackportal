import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import HomeChallengeCard from './HomeChallengeCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// This section is hidden if there are no challenges
export default function HomeChallenges(props: { challenges: Challenge[] }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [challengeIdx, setChallengeIdx] = useState(null);
  const [challengeData, setChallengeData] = useState({
    title: '',
    organization: '',
    description: '',
    prizes: [],
  });
  const [showChallengeCard, setShowChallengeCard] = useState(false);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Organize challenges in order by rank given in firebase
    const sortedChallenges = props.challenges.sort((a, b) => (a.rank > b.rank ? 1 : -1));

    if (sortedChallenges.length != 0) {
      setChallenges(sortedChallenges);
      setChallengeData({
        title: sortedChallenges[0].title,
        organization: sortedChallenges[0].organization,
        description: sortedChallenges[0].description,
        prizes: sortedChallenges[0].prizes,
      });
    }
  }, []);

  const changeOrg = (challenge, newIdx) => {
    setShowChallengeCard(true);

    setChallengeIdx(newIdx);
    setChallengeData({
      title: challenge.title,
      organization: challenge.organization,
      description: challenge.description,
      prizes: challenge.prizes,
    });
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    challenges.length != 0 && (
      <section className="md:py-12 py-6 xl:w-9/10 w-11/12 m-auto">
        <div className="font-bold md:text-4xl text-2xl my-4 text-complementary">Challenges</div>
        {/* Challenge Orgs Selectors*/}
        <div className="relative mt-4 sm:w-[95%] w-[85%] mx-auto">
          <Swiper
            modules={[Navigation, A11y, Pagination]}
            spaceBetween={10}
            allowTouchMove={false}
            // navigation
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            // Responsive breakpoints
            breakpoints={{
              // when window width is >= 0px
              0: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
              // when window width is >= 1536px
              1290: {
                spaceBetween: 50,
                slidesPerView: 4,
              },
            }}
          >
            {challenges.map((challenge, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full items-center justify-center flex">
                  <div
                    id={`org${idx}`}
                    className={`${idx} font-bold text-primaryDark p-5 flex align-bottom flex-col items-start justify-end z-10 relative cursor-pointer text-left text-xl w-[22rem] 2xl:w-full sm:h-[16rem] h-[14rem] ${
                      idx == challengeIdx ? 'bg-primary/50' : 'bg-secondary'
                    } rounded-lg`}
                    key={idx}
                    onClick={() => changeOrg(challenge, idx)}
                  >
                    {challenge.organization}
                    <button className=" text-primaryDark rounded-lg mt-1 text-xs">
                      Learn more
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="-translate-x-12 -translate-y-32">
            <div className="swiper-button-prev" />
          </div>
          <div className="translate-x-12 -translate-y-32">
            <div className="swiper-button-next" />
          </div>
          {/* Challenges Description Cards */}
          <div className="my-4">
            {showChallengeCard && (
              <HomeChallengeCard
                title={challengeData.title}
                organization={challengeData.organization}
                description={challengeData.description}
                prizes={challengeData.prizes}
              />
            )}
          </div>
          <div className="block md:hidden translate-y-8">
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>
    )
  );
}
