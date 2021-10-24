import { Disclosure } from '@headlessui/react';
import { CheckCircleFilled } from '@ant-design/icons';
import { ChevronUpIcon } from '@heroicons/react/solid';

/**
 *
 * Props used by AnsweredQuestion component used in /about/questions
 *
 * @param question question asked by current user
 * @param answer answer from organizer for corresponding question
 * @param colorCode color code used for background of component
 * @param iconColorCode color code used for checkmark icon that goes with the component
 *
 */
interface AnsweredQuestionProps {
  question: string;
  answer: string;
  colorCode: string;
  iconColorCode: string;
}

/**
 *
 * Component representing an answered question in /about/questions
 *
 */
export default function AnsweredQuestion({
  question,
  answer,
  colorCode,
  iconColorCode,
}: AnsweredQuestionProps) {
  return (
    <div className="my-4">
      <Disclosure>
        {({ open }) => (
          <div className="w-full">
            <div className="flex flex-row items-center gap-x-2">
              <CheckCircleFilled style={{ color: iconColorCode }} />
              <Disclosure.Button className="w-full">
                <div>
                  <div
                    className="rounded-lg py-2 px-3 flex flex-row justify-between"
                    style={{ backgroundColor: colorCode }}
                  >
                    <h1 className="text-left font-semibold">{question}</h1>
                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
                  </div>
                </div>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel className="py-2 px-6">{answer}</Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
