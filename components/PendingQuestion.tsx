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
      <div className="rounded-lg w-full py-2 md:px-4 px-2 announcements">
        <h1 className="">{question}</h1>
      </div>
    </div>
  );
}
