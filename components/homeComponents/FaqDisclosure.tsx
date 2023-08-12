import { Disclosure, Transition } from '@headlessui/react';
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
  answer: any;
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
      <div className="transition duration-500 ease-in-out">
        <Disclosure.Button
          className={`font-medium w-full ${
            isOpen ? '' : 'border-b-2 border-[#111A31] transition duration-300 ease-in-out'
          }`}
          as="div"
        >
          <button
            className="lg:w-[130%] lg:-translate-x-[12%] md:w-[140%] md:-translate-x-[15%] w-[140%] -translate-x-[15%] md:my-4 my-2"
            onClick={() => {
              toggleDisclosure();
            }}
          >
            <div className="text-center lg:text-2xl md:text-xl sm:text-base text-sm">
              {question}
            </div>
            {/* <ChevronDownIcon
              className={`${
                isOpen
                  ? 'transform rotate-180 transition duration-500 ease-in-out'
                  : 'transition duration-500 ease-in-out'
              } w-5 h-5`}
            /> */}
          </button>
        </Disclosure.Button>

        {/* {isOpen && ( */}
        <Transition
          show={isOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel
            className={`text-center ${
              isOpen ? 'border-b-2 border-[#111A31] transition duration-300 ease-in-out' : ''
            }`}
            static
          >
            <div className="lg:w-[130%] lg:-translate-x-[12%] md:w-[140%] md:-translate-x-[15%] w-[140%] -translate-x-[15%] md:mb-4 mb-2 md:text-base sm:text-sm text-xs">
              {answer}
            </div>
          </Disclosure.Panel>
        </Transition>
        {/* )} */}
      </div>
    </Disclosure>
  );
}
