import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

interface FaqDisclosureProps {
  question: string;
  answer: string;
}

export default function FaqDisclosure({ question, answer }: FaqDisclosureProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <Disclosure.Button className="py-2 text-black text-left border-b-2 border-black w-full flex flex-row justify-between">
            <span>{question}</span>
            <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 py-2">{answer}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
