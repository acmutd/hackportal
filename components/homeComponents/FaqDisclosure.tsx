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
      <div className="transition duration-500 ease-in-out">
        <Disclosure.Button
          className={`p-2 text-complementary font-medium text-left  w-full ${
            isOpen ? '' : 'border-b-2 border-complementary transition duration-300 ease-in-out'
          }`}
          as="div"
        >
          <button
            className="w-full flex flex-row justify-between items-center"
            onClick={() => {
              toggleDisclosure();
            }}
          >
            <span className="text-left">{question}</span>
            <ChevronDownIcon
              className={`${
                isOpen
                  ? 'transform rotate-180 transition duration-500 ease-in-out'
                  : 'transition duration-500 ease-in-out'
              } w-5 h-5`}
            />
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
            className={`my-2 py-2  p-2 text-complementary text-left  ${
              isOpen ? 'border-b-2 border-complementary transition duration-300 ease-in-out' : ''
            }`}
            static
          >
            {answer}
          </Disclosure.Panel>
        </Transition>
        {/* )} */}
      </div>
    </Disclosure>
  );
}
