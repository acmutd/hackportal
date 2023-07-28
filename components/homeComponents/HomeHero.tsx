import { useRouter } from 'next/router';
import { buttonDatas } from '../../lib/data';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';

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
    <section className="min-h-screen p-4 bg-contain hero-bg mt-[-7rem] pt-[7rem] flex flex-col justify-between">
      <div>
        <div className="mx-auto w-[48rem] h-[19rem] relative mt-16">
          <Image src="/assets/hero-ecsw.png" alt="ecsw" layout="fill" object-fit="fill"></Image>
        </div>
        {!eventStarted ? (
          <p className=" flex relative text-white mx-auto flex justify-center text-sm mt-3">
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
          <p className="text-white text-sm text-center mt-3">THE EVENT HAS STARTED!</p>
        )}
        <div className="text-white text-center text-sm">NOVEMBER 4 - 5</div>
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
        <div className="w-full flex justify-center mt-12">
          <button className="text-2xl py-3 px-6 rounded-full bg-gradient-to-l from-[#F6CC82] to-[#BD8A31] text-[#202c54]">
            REGISTER
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-white text-xs">THE LARGEST HACKATHON IN TEXAS</div>
        <div className="text-white w-6 h-6 slowbounce">
          <ChevronDownIcon />
        </div>
      </div>
    </section>
  );
}
