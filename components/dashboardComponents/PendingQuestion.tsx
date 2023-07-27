/**
 * Representing props used by PendingQuestion component
 *
 * @param question question from user waiting to be answered
 */
interface PendingQuestionProps {
  question: string;
}

/**
 *
 * Component representing an unanswered question in /about/questions
 *
 */
export default function PendingQuestion({ question }: PendingQuestionProps) {
  return (
    <div className="flex flex-row items-center gap-x-2 my-3">
      <svg height="14" width="14" className="fill-current text-primary">
        <circle cx="7" cy="7" r="5" />
      </svg>
      <div className="rounded-lg w-full py-2 px-3 bg-secondary text-complementaryDark">
        <h1 className="font-semibold">{question}</h1>
      </div>
    </div>
  );
}
