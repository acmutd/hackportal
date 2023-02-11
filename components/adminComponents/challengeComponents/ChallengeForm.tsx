import { useState } from 'react';

interface ChallengeFormProps {
  challenge?: Challenge;
  onSubmitClick: (challengeData: Challenge) => Promise<void>;
  formAction: 'Edit' | 'Add';
}

export default function ChallengeForm({
  challenge,
  onSubmitClick,
  formAction,
}: ChallengeFormProps) {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [challengeForm, setChallengeForm] = useState<typeof challenge>(
    challenge || {
      description: '',
      organization: '',
      title: '',
      prizes: [],
      rank: -1,
    },
  );
  return (
    <div className="my-3 flex flex-col gap-y-4">
      <input
        value={challengeForm.title}
        onChange={(e) => setChallengeForm((prev) => ({ ...prev, title: e.target.value }))}
        type="text"
        placeholder="Enter challenge title"
        className="border-2 p-3 rounded-lg"
      />
      <input
        value={challengeForm.organization}
        onChange={(e) => setChallengeForm((prev) => ({ ...prev, organization: e.target.value }))}
        type="text"
        placeholder="Enter organization"
        className="border-2 p-3 rounded-lg"
      />
      <textarea
        cols={50}
        className="border-2 p-3 rounded-lg"
        value={challengeForm.description}
        placeholder="Enter challenge description"
        onChange={(e) => {
          setChallengeForm((prev) => ({
            ...prev,
            description: e.target.value,
          }));
        }}
      />

      {challengeForm.prizes?.map((prize, idx) => (
        <div key={idx} className="flex gap-x-2 w-full">
          <input
            className="border-2 p-3 rounded-lg w-3/4"
            value={prize}
            key={idx}
            type="text"
            placeholder="Enter prizes"
            onChange={(e) =>
              setChallengeForm((prev) => ({
                ...prev,
                prizes: prev.prizes.map((sp, i) => {
                  if (i === idx) return e.target.value as string;
                  return sp;
                }),
              }))
            }
          ></input>
          <button
            onClick={() =>
              setChallengeForm((prev) => ({
                ...prev,
                prizes: prev.prizes.filter((sp, i) => i !== idx),
              }))
            }
            className="bg-red-400 rounded-lg p-2 w-1/4"
          >
            Delete Prizes
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          setChallengeForm((prev) => ({
            ...prev,
            prizes: prev.prizes ? [...prev.prizes, ''] : [''],
          }))
        }
        className="p-3 bg-green-400 rounded-lg"
      >
        Add Prizes
      </button>
      <button
        disabled={disableSubmit}
        onClick={async () => {
          setDisableSubmit(true);
          try {
            await onSubmitClick(challengeForm);
          } catch (error) {
          } finally {
            setDisableSubmit(false);
          }
        }}
        className="p-3 bg-green-400 rounded-lg"
      >
        {formAction === 'Edit' ? 'Save Changes' : 'Add Event'}
      </button>
    </div>
  );
}
