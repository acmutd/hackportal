interface PendingQuestionProps {
  question: string;
}

export default function PendingQuestion({ question }: PendingQuestionProps) {
  return (
    <div className="flex flex-row items-center gap-x-2 my-3">
      <svg height="14" width="14">
        <circle cx="7" cy="7" r="5" fill="#F8ACFF" />
      </svg>
      <div className="rounded-lg w-full py-2 px-3" style={{ backgroundColor: '#FDECFF' }}>
        <h1 className="font-semibold">{question}</h1>
      </div>
    </div>
  );
}
