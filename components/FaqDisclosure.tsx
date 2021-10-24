import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

/**
 *
 * Represents props used by FaqDisclosure component
 *
 * @param question a frequently asked question
 * @param answer answer to corresponding question
 * @param isOpen boolean variable used to determine whether the disclosure should be open or not
 * @param toggleDisclosure function to call when user wants to open/close disclosure
 *
 */
interface FaqDisclosureProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleDisclosure: () => void;
}

/**
 *
 * Component representing a FAQ question in /about/faq
 *
 */
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
