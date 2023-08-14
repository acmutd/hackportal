import { useRouter } from 'next/router';
import { buttonDatas } from '../../lib/data';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomeHero() {
  const router = useRouter();

  useEffect(() => {
    countdownTimer();
  }, []);

  const [expiryTime, setExpiryTime] = useState('5 nov 2023 08:00:00');
  const [eventStarted, setEventStarted] = useState(false);
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: '',
    countdownHours: '',
    countdownMinutes: '',
    countdownSeconds: '',
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;

      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays < 10 ? '0' + totalDays.toString() : totalDays.toString(),
        countdownHours: totalHours < 10 ? '0' + totalHours.toString() : totalHours.toString(),
        countdownMinutes:
          totalMinutes < 10 ? '0' + totalMinutes.toString() : totalMinutes.toString(),
        countdownSeconds:
          totalSeconds < 10 ? '0' + totalSeconds.toString() : totalSeconds.toString(),
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        setEventStarted(true);
        clearInterval(timeInterval);
        setExpiryTime('0');
      }
    }, 1000);
  };

  return (
    <section className="min-h-screen p-4 bg-contain bg-[url('/assets/hero-bg.png')]  md:mt-[-8rem] mt-[-5rem] md:pt-[7rem] pt-[10rem] flex flex-col md:justify-center">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="mx-auto 2xl:w-[75rem] 2xl:h-[33rem] lg:w-[48rem] lg:h-[19rem] md:w-[40rem] md:h-[15rem] sm:w-[35rem] sm:h-[12rem] w-[22rem] h-[9rem] relative md:mt-0 mt-28">
          <Image src="/assets/hero-ecsw.svg" alt="ecsw" layout="fill" object-fit="fill"></Image>
        </div>
        {!eventStarted ? (
          <p className=" relative text-white mx-auto flex justify-center 2xl:text-lg md:text-sm text-xs mt-3">
            TIME UNTIL EVENT |
            <div className="mx-2">
              <div>{countdownTime.countdownDays}</div>
            </div>
            :
            <div className="mx-2">
              <div>{countdownTime.countdownHours}</div>
            </div>
            :
            <div className="mx-2">
              <div>{countdownTime.countdownMinutes}</div>
            </div>
            :
            <div className="mx-2">
              <div>{countdownTime.countdownSeconds}</div>
            </div>
          </p>
        ) : (
          <p className="text-white 2xl:text-lg md:text-sm text-xs text-center mt-3">
            THE EVENT HAS STARTED!
          </p>
        )}
        <div className="text-white text-center 2xl:text-lg md:text-sm text-xs">NOVEMBER 4 - 5</div>
        {/* <div className="flex flex-col items-center md:flex-row md:justify-around px-44 md:space-y-0 space-y-3 > *">
          {buttonDatas.map((button) => (
            <button
              key={button.text}
              onClick={() => router.push(button.path)}
              className="max-w-[14rem] w-[14rem] md:max-w-full bg-white py-4 rounded-xl h-10 flex items-center justify-center font-semibold text-xl text-primaryDark border-2 border-gray-300"
            >
              {button.text}
            </button>
          ))}
        </div> */}
        <div className="flex flex-col justify-center mt-4">
          <Link href="/register" passHref>
            <button className="md:text-2xl text-lg py-3 px-4 rounded-full bg-gradient-to-l from-[#F6CC82] to-[#BD8A31] text-[#202c54]">
              REGISTER
            </button>
          </Link>
        </div>
        <div className="absolute flex flex-col items-center justify-center bottom-3 w-full">
          <div className="text-white sm:text-sm text-xs">THE LARGEST HACKATHON IN TEXAS</div>
          <div className="text-white w-6 h-6 slowbounce">
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
