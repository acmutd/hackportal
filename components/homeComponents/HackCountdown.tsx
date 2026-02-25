import React, { useState, useEffect, CSSProperties } from 'react';
import styles from './HackCountdown.module.css';
import { config } from '../../hackportal.config';

interface CountdownProps {
  targetDate: string;
}

const HackCountdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={`${styles.countdownContainer} countdown-section`}>
      <h1 className={`${styles.header} countdown-header`}>Countdown</h1>

      <div className={`${styles.timeSection} countdown-timer`}>
        {Object.entries(timeLeft).map(([unit, value]) => {
          const digits = value.toString().padStart(2, '0').split('');
          return (
            <div key={unit} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex' }}>
                {digits.map((digit, index) => (
                  <div key={`${unit}-${index}`} className={styles.digitBox}>
                    <span className={styles.digit}>{digit}</span>
                  </div>
                ))}
              </div>
              <div className={styles.label}>{unit.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
      {/* <div className={styles.notifySection}>
        <p>We will let you know when we are launching</p>
        <button className={styles.button}>Notify Me</button>
      </div> */}
    </div>
  );
};

const HackUTDCountdown: React.FC = () => {
  return <HackCountdown targetDate={config.targetDate} />;
};

export default HackUTDCountdown;
