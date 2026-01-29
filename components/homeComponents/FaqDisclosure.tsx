import { Disclosure, Transition } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

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
      <div
        style={{
          boxShadow: '0 5px 16px 0 rgb(8,52,15,0.06)',
        }}
        className="transition duration-500 ease-in-out bg-white rounded-md p-4"
      >
        <Disclosure.Button className={`p-2 text-#5C2E12 font-medium text-left  w-full`} as="div">
          <button
            className="w-full flex flex-row justify-between items-center"
            onClick={() => {
              toggleDisclosure();
            }}
          >
            <h1 style={{ fontFamily: 'Fredoka', color: '#5C2E12' }} className="text-left text-xl">
              {question}
            </h1>
            <div
              style={{ backgroundColor: !isOpen ? '#F7F7FB' : '#5C2E12' }}
              className="p-3 rounded-md transition duration-500 ease-in-out"
            >
              {!isOpen ? (
                <PlusIcon className={'transition duration-500 ease-in-out w-5 h-5'} />
              ) : (
                <MinusIcon className={`transition duration-500 ease-in-out w-5 h-5 text-white`} />
              )}
            </div>
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
            style={{ color: '#000000' }}
            className={`my-2 py-2  p-2 text-left text-sm`}
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
