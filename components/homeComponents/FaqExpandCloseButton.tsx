import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface FaqExpandCloseButtonProps {
  disclosuresStatus: boolean[];
  setDisclosureStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function FaqExpandCloseButton({
  disclosuresStatus,
  setDisclosureStatus,
}: FaqExpandCloseButtonProps) {
  function handleExpandCloseAll(disclosuresStatus) {
    return () => {
      if (disclosuresStatus.every((status) => status)) {
        setDisclosureStatus(disclosuresStatus.map(() => false));
      } else {
        setDisclosureStatus(disclosuresStatus.map(() => true));
      }
    };
  }
  return (
    <>
      <button onClick={handleExpandCloseAll(disclosuresStatus)} className="font-bold">
        {disclosuresStatus.every((status) => status) ? 'Close All' : 'Expand All'}
      </button>
      <ChevronDownIcon
        className={`${
          disclosuresStatus.every((status) => status)
            ? 'transform rotate-180 transition duration-500 ease-in-out'
            : 'transition duration-500 ease-in-out'
        } w-5 h-5`}
      />
    </>
  );
}

export default FaqExpandCloseButton;
