import ErrorCard from './ErrorCard';

interface ErrorListProps {
  errors: string[];
  onClose: (idx: number) => void;
}

export default function ErrorList({ errors, onClose }: ErrorListProps) {
  return (
    <div>
      {errors.map((error, idx) => (
        <ErrorCard
          key={idx}
          errorMsg={error}
          onClose={() => {
            onClose(idx);
          }}
        />
      ))}
    </div>
  );
}
