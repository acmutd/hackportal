import { ArrowNarrowRightIcon } from '@heroicons/react/solid';

interface EventDetailLinkProps {
  title: string;
}

export default function EventDetailLink({ title }: EventDetailLinkProps) {
  return (
    <div
      className="border-b-2 py-2 flex flex-row items-center gap-x-2"
      style={{ borderColor: '#7B81FF' }}
    >
      <h1 className="text-lg font-bold" style={{ color: '#7B81FF' }}>
        {title}
      </h1>
      <ArrowNarrowRightIcon className="w-5 h-5" style={{ color: '#7B81FF' }} />
    </div>
  );
}
