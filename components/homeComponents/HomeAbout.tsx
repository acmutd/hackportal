import React from 'react';
import { CSSProperties } from 'react';

const HomeAbout = () => {
  interface CustomShapesStyles {
    [key: string]: CSSProperties;
  }

  const customShapesStyles: CustomShapesStyles = {
    customShapeOne: {
      position: 'absolute',
      top: '13px',
      left: '27.5%',
      width: '30%',
      height: '130px',
      background: '#C1C8FF',
      borderRadius: '0px 0px 0px 158px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
    labelBoxOne: {
      fontWeight: 700,
      fontSize: 'calc(10px + 2vw)',
      fontFamily: "'Alfa Slab One', cursive",
      color: '#5C2E12',
      marginBottom: '-10px',
    },
    customShapeTwo: {
      position: 'absolute',
      top: '160px',
      left: '12.5%',
      width: '45%',
      height: '200px',
      background: '#C1C8FF',
      borderRadius: '0px 158px 0px 158px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
    labelBoxTwo: {
      fontWeight: 700,
      fontSize: 'calc(10px + 2vw)',
      fontFamily: "'Alfa Slab One', cursive",
      color: '#5C2E12',
      marginBottom: '-10px',
    },
    customShapeThree: {
      position: 'absolute',
      top: '13px',
      right: '10%',
      width: '30%',
      height: '347px',
      background: '#C1C8FF',
      borderRadius: '0 158px 0 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
    },
    labelBoxThree: {
      fontWeight: 700,
      fontSize: 'calc(10px + 2vw)',
      fontFamily: "'Alfa Slab One', cursive",
      color: '#5C2E12',
      marginBottom: '-10px',
    },
    customShapeFour: {
      position: 'absolute',
      top: '13px',
      left: '12.5%',
      width: '15%',
      height: '130px',
      background: '#C1C8FF',
      borderRadius: '0 158px 0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      transition: 'transform 400ms',
      cursor: 'pointer',
      flexDirection: 'column',
    },
    statisticText: {
      fontSize: 'calc(16px + 0.25vw)',
      color: '#5C2E12',
      fontFamily: "'Alfa Slab One', cursive",
    },
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      width: '100vw',
      height: '120vh',
      overflow: 'hidden',
      padding: '6rem 4rem',
    },
    header: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 700,
      fontSize: 'calc(26px + 2.5vw)',
      color: '#FFFFFF',
      padding: '1vh 0',
      textShadow: '0 6px 18px rgba(0,0,0,0.7)',
      zIndex: 1,
      position: 'relative',
    },
    description: {
      fontFamily: "'Alfa Slab One', cursive",
      fontWeight: 400,
      fontSize: 'calc(12px + 0.8vw)',
      color: '#FFFFFF',
      width: '75%',
      margin: '1vh 0',
      lineHeight: '1.6',
      textShadow: '0 6px 18px rgba(0,0,0,0.7)',
      zIndex: 1,
      position: 'relative',
    },

    statsContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 400,
      fontSize: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginTop: '2vh',
    },
    statsItem: {
      width: '45%',
      margin: '2% 0',
      position: 'relative',
    },
  };

  return (
    <div className="section-bg bg-2" style={styles.container}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <style>
        {`
          @media (max-width: 600px) {
            .container {
              height: 400vh !important;
            }
            .statsContainer {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .customShapeOne {
              width: 50% !important;
              height: 85px !important;
              left: 45% !important;
            }
            .customShapeTwo {
              width: 90% !important;
              top: 110px !important;
              height: 110px !important;
              left: 5% !important;
            }
            .customShapeThree {
              width: 90% !important;
              top: 235px !important;
              height: 275px !important;
              left: 5% !important;
            }
            .customShapeFour {
              width: 40% !important;
              height: 85px !important;
              left: 5% !important;
            }
          }
        `}
      </style>
      <h1 className="header" style={styles.header}>
        About NTHS Hack
      </h1>
      <p className="description" style={styles.description}>
        The Association of Computing Machinery (ACM) at the University of Texas at Dallas will be
        hosting the third iteration of our hackathon experience! This two day long event will be an
        intense competition of self expression and creativity through technology, where students
        will get the chance to showcase their web development skills. High school students across
        North Texas with varying technical backgrounds will come together, form teams, and build
        unique solutions from scratch. This beginner-friendly hackathon is an extraordinary
        opportunity for you to win prizes, compete, and jumpstart your journey in technology!
      </p>
    </div>
  );
};

export default HomeAbout;
