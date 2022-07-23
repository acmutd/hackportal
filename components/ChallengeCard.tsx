import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface ChallengeCardProps {
  challenge: SortableObject<Challenge>;
  onChallengeEditClick: () => void;
  onChallengeDeleteClick: () => void;
}

export default function ChallengeCard({
  challenge,
  onChallengeEditClick,
  onChallengeDeleteClick,
}: ChallengeCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: challenge.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move flex items-center justify-between p-3 border-2 my-4 rounded-xl"
    >
      <h1 className="text-lg">{challenge.title}</h1>
      <div className="flex gap-4">
        <button onClick={() => onChallengeEditClick()} className="p-3 bg-green-400 rounded-lg">
          Edit Challenge
        </button>
        <button onClick={() => onChallengeDeleteClick()} className="p-3 bg-red-400 rounded-lg">
          Delete Challenge
        </button>
      </div>
    </div>
  );
}
