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
      position: 'relative',
      width: '100vw',
      height: '120vh',
      overflow: 'hidden',
      padding: 0,
      marginTop: '-10vh',
      backgroundColor: 'transparent',
    },

    billboardText: {
      position: 'absolute',
      left: '44%',
      top: '55%',
      width: '50%',
      maxWidth: '550px',
      textAlign: 'center',
      color: '#fff',
      textShadow: '0 6px 18px rgba(0,0,0,0.5)',
      zIndex: 2,
      pointerEvents: 'none',
    },

    header: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 250,
      fontSize: 'clamp(28px, 4vw, 68px)',
      margin: 0,
      transform: 'translateY(-72px)',
    },

    description: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 200,
      fontSize: 'clamp(8px, 1.2vw, 22px)',
      lineHeight: 1.5,
      marginTop: '12px',
      maxHeight: '42vh',
      overflow: 'hidden',
    },
  };

  return (
    <section className="section-bg bg-2" style={styles.container}>
      <motion.div
        ref={ref}
        style={styles.billboardText}
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: hasAnimated ? 1 : 0,
          x: hasAnimated ? 0 : -100,
        }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      >
        <h1 style={styles.header}>About NTHS Hack</h1>
        <p style={styles.description}>
          The Association of Computing Machinery (ACM) at the University of Texas at Dallas will be
          hosting the third iteration of our hackathon experience! This two day long event will be
          an intense competition of self expression and creativity through technology, where
          students will get the chance to showcase their web development skills. High school
          students across North Texas with varying technical backgrounds will come together, form
          teams, and build unique solutions from scratch. This beginner-friendly hackathon is an
          extraordinary opportunity for you to win prizes, compete, and jumpstart your journey in
          technology!
        </p>
      </motion.div>
    </section>
  );
};

export default HomeAbout;
