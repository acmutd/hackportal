import ErrorCard from './ErrorCard';

interface ErrorListProps {
  errors: string[];
  onClose: (idx: number) => void;
}

export default function ErrorList({ errors, onClose }: ErrorListProps) {
  return (
    <div className="p-4">
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
