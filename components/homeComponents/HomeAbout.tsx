import React from 'react';
import { CSSProperties } from 'react';

const HomeAbout = () => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'relative',
      width: '100vw',
      height: '120vh',
      overflow: 'hidden',
      // IMPORTANT: remove big padding that pushes text around
      padding: 0,
      marginTop: '-10vh',
      backgroundColor: 'transparent',
    },

    // THIS is the "inside the billboard" box
    billboardText: {
      position: 'absolute',
      left: '44%',
      top: '45%', // move overall block up/down
      transform: 'translate(-50%, -50%)',
      width: '50%', // constrain to parchment width
      maxWidth: '550px', // prevents huge width on large screens
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
      // move ONLY the header upward (relative to paragraph)
      transform: 'translateY(-72px)',
    },

    description: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 200,
      fontSize: 'clamp(8px, 1.2vw, 22px)',
      lineHeight: 1.5,
      marginTop: '12px',
      // keep text inside billboard area
      maxHeight: '42vh',
      overflow: 'hidden',
    },
  };

  return (
    <section className="section-bg bg-2" style={styles.container}>
      {/* text overlay INSIDE billboard */}
      <div style={styles.billboardText}>
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
      </div>
    </section>
  );
};

export default HomeAbout;
