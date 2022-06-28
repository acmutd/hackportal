import React from 'react';

interface ChallengeListProps {
  challenges: Challenge[];
  onChallengeEditClick: (challengeIndex: number) => void;
  onChallengeDeleteClick: (challengeIndex: number) => void;
}

export default function ChallengeList({
  challenges,
  onChallengeEditClick,
  onChallengeDeleteClick,
}: ChallengeListProps) {
  return (
    <div className="p-5">
      {challenges.map((challenge, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 border-2 my-4 rounded-xl">
          <h1 className="text-lg">{challenge.title}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => onChallengeEditClick(idx)}
              className="p-3 bg-green-400 rounded-lg"
            >
              Edit Challenge
            </button>
            <button
              onClick={() => onChallengeDeleteClick(idx)}
              className="p-3 bg-red-400 rounded-lg"
            >
              Delete Challenge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
