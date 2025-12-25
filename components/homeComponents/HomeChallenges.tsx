import { useEffect, useState } from 'react';

import HomeChallengesCard from './HomeChallengeCard';

export default function HomeChallengesComponent(props: { challenges: Challenge[] }) {
  return (
    props.challenges.length !== 0 && (
      <section className="bg-8 schedule-alfa min-h-[90vh] md:min-h-[100vh] lg:min-h-[120vh] py-20 md:py-32 mb-24">
        <div className="flex items-center">
          <span className="header-sponsors">Challenge Tracks</span>
        </div>
        <div className="w-full mb-2">
          <div className="md:w-2/5 w-full mx-auto p-4 text-balance"></div>
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
