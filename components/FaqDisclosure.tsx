import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

interface FaqDisclosureProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleDisclosure: () => void;
}

export default function FaqDisclosure({
  question,
  answer,
  isOpen,
  toggleDisclosure,
}: FaqDisclosureProps) {
  return (
    <Disclosure>
      <div>
        <Disclosure.Button
          className="py-2 text-black text-left border-b-2 border-black w-full"
          as="div"
        >
          <button
            className="w-full flex flex-row justify-between items-center"
            onClick={() => {
              toggleDisclosure();
            }}
          >
            <span>{question}</span>
            <ChevronUpIcon className={`${isOpen ? 'transform rotate-180' : ''} w-5 h-5`} />
          </button>
        </Disclosure.Button>
        {isOpen && (
          <Disclosure.Panel className="text-gray-500 py-2" static>
            {answer}
          </Disclosure.Panel>
        )}
      </div>
    </Disclosure>
  );
}
