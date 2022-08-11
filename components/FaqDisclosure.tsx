import { IntegratedEditingProps } from '@devexpress/dx-react-scheduler';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

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
  idx: number;
  max: number;
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
  idx,
  max,
  toggleDisclosure,
}: FaqDisclosureProps) {
  return (
    <Disclosure>
      <div
        className={`${
          idx == 0 || idx == max ? 'border-t-2' : 'border-t-0'
        } border-b-2 border-white text-white`}
      >
        <Disclosure.Button
          className="py-4 text-left rounded-md w-full xl:text-2xl lg:text-lg md:text-base text-sm font-black"
          as="div"
        >
          <button
            className="w-full flex flex-row justify-between items-center"
            onClick={() => {
              toggleDisclosure();
            }}
          >
            <span className="text-left">{question}</span>
            <ChevronDownIcon className={`${isOpen ? 'transform rotate-180' : ''} w-5 h-5`} />
          </button>
        </Disclosure.Button>
        {isOpen && (
          <Disclosure.Panel className="xl:text-lg md:text-base text-sm" static>
            {answer}
          </Disclosure.Panel>
        )}
      </div>
    </Disclosure>
  );
}
