import React from 'react';
import ChallengeCard from '../../dashboardComponents/ChallengeCard';
import {
  DndContext,
  useSensors,
  useSensor,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface ChallengeListProps {
  challenges: SortableObject<Challenge>[];
  onUpdateOrder: (oldIndex: number, newIndex: number) => void;
  onChallengeEditClick: (challengeIndex: number) => void;
  onChallengeDeleteClick: (challengeIndex: number) => void;
}

export default function ChallengeList({
  challenges,
  onUpdateOrder,
  onChallengeEditClick,
  onChallengeDeleteClick,
}: ChallengeListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = challenges.findIndex((obj) => obj.id === active.id);
      const newIndex = challenges.findIndex((obj) => obj.id === over.id);
      onUpdateOrder(oldIndex, newIndex);
    }
  }

  return (
    <div className="p-5">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={challenges} strategy={verticalListSortingStrategy}>
          {challenges.map(({ title, description, prizes }, idx) => (
            <ChallengeCard key={idx} title={title} description={description} prizes={prizes} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
