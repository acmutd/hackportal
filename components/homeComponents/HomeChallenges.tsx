import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import HomeChallengeCard from './HomeChallengeCard';

// This section is hidden if there are no challenges
export default function HomeChallenges(props: { challenges: Challenge[] }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeData, setChallengeData] = useState({
    title: '',
    organization: '',
    description: '',
    prizes: [],
  });

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

    // Initialize styles to first organization in list
    if (document.getElementById(`org${challengeIdx}`) !== null) {
      document.getElementById(`org${challengeIdx}`).style.backgroundColor =
        'rgba(123, 129, 255, 0.5)';
    }
  }, []);

  const changeOrg = (challenge, newIdx) => {
    document.getElementById(`org${challengeIdx}`).style.backgroundColor = '#F2F3FF';
    document.getElementById(`org${newIdx}`).style.backgroundColor = 'rgba(123, 129, 255, 0.5)';

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
      <section className="md:p-12  p-6">
        <div className="font-bold  md:text-4xl text-2xl my-4 text-complementary">Challenges</div>
        <div className="flex flex-col justify-center items-center w-full">
          {/* Challenge Orgs Selectors*/}
          <div className="w-full">
            <Swiper
              navigation={windowWidth > 720 ? true : false}
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
                },
                // when window width is >= 480px
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                620: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // when window width is >= 640px
                840: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },

                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {challenges.map((challenge, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    id={`org${idx}`}
                    className={`${idx} font-bold text-primaryDark p-5 flex align-bottom flex-col items-start justify-end z-10 relative cursor-pointer text-center text-xl w-64 h-48  bg-secondary rounded-lg`}
                    key={idx}
                    onClick={() => changeOrg(challenge, idx)}
                  >
                    {/* change arrow color in global css to match parent selector */}
                    {/* <div className="arrow-right absolute top-1/2 right-0 -translate-y-1/2 translate-x-full hidden"></div> */}
                    {challenge.organization}
                    <button className=" text-primaryDark rounded-lg mt-1 text-xs">
                      Learn more
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Challenges Description Cards */}
          <div className="my-4 w-full lg:w-11/12 xl:w-full xl:pl-11 xl:pr-11">
            <HomeChallengeCard
              title={challengeData.title}
              organization={challengeData.organization}
              description={challengeData.description}
              prizes={challengeData.prizes}
            />
          </div>
        </div>
      </section>
    )
  );
}
