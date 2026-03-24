import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HomeAbout = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  return (
    <section
      className="
        relative
        w-full
        h-full
        flex
        items-center
        justify-center
        z-20
        pointer-events-none
        px-4 sm:px-6 md:px-8
      "
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 8 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        className="mx-auto w-full max-w-[720px] lg:max-w-[60%] text-center text-white home-about"
        style={{ textShadow: '0 6px 18px rgba(0,0,0,0.5)' }}
      >
        <h1 className="font-['Alfa_Slab_One'] text-[clamp(28px,4vw,68px)] mb-4 md:mb-10">
          About NTHS Hack
        </h1>

        <p className="font-['Alfa_One'] font-normal text-[clamp(11px,1vw,15px)] leading-relaxed -mt-4 max-w-full whitespace-normal break-words">
          The Association of Computing Machinery (ACM) at the University of Texas at Dallas will be
          hosting the third iteration of our hackathon experience! This one day long event will be
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
