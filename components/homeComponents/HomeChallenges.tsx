import { useEffect, useState } from 'react';

import HomeChallengesCard from './HomeChallengeCard';

export default function HomeChallengesComponent(props: { challenges: Challenge[] }) {
  return (
    props.challenges.length !== 0 && (
      <section className="schedule-alfa pt-10 md:pt-14 pb-20 md:pb-28">
        <div
          className="text-center p-4 white-text"
          style={{
            fontFamily: "'Alfa Slab One', cursive",
            fontWeight: 250,
            fontSize: 'clamp(28px, 4vw, 68px)',
          }}
        >
          Challenge Tracks
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:p-10 items-center gap-x-6 mt-6 mx-auto">
          {props.challenges.map((challenge, idx) => (
            <HomeChallengesCard key={idx} challenge={challenge} blockType={idx % 3} />
          ))}
        </div>
      </section>
    )
  );
}
