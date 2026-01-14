import React, { useEffect, useRef, useState } from 'react';
import { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HomeAbout = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      console.log('Animation triggered!');
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: '2rem 0',
      backgroundColor: 'transparent',
    },

    boardContainer: {
      position: 'relative',
      width: '90vw',
      maxWidth: '1400px',
      aspectRatio: '16 / 9',
      backgroundImage: 'url("/assets/full-bg.png")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },

    textWrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      maxWidth: '600px',
      textAlign: 'center',
      color: '#fff',
      textShadow: '0 6px 18px rgba(0,0,0,0.5)',
      zIndex: 2,
      pointerEvents: 'none',
    },

    header: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 250,
      fontSize: 'clamp(24px, 3.5vw, 56px)',
      margin: 0,
      marginBottom: 'clamp(8px, 1vw, 16px)',
    },

    description: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 200,
      fontSize: 'clamp(10px, 1.2vw, 20px)',
      lineHeight: 1.5,
      margin: 0,
    },
  };

  return (
    <section className="section-bg" style={styles.container}>
      <div style={styles.boardContainer}>
        <motion.div
          ref={ref}
          style={styles.textWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: hasAnimated ? 1 : 0,
            scale: hasAnimated ? 1 : 0.9,
          }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        >
          <h1 style={styles.header}>About NTHS Hack</h1>
          <p style={styles.description}>
            The Association of Computing Machinery (ACM) at the University of Texas at Dallas will
            be hosting the third iteration of our hackathon experience! This two day long event will
            be an intense competition of self expression and creativity through technology, where
            students will get the chance to showcase their web development skills. High school
            students across North Texas with varying technical backgrounds will come together, form
            teams, and build unique solutions from scratch. This beginner-friendly hackathon is an
            extraordinary opportunity for you to win prizes, compete, and jumpstart your journey in
            technology!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeAbout;
