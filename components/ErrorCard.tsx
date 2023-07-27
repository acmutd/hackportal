import { XIcon } from '@heroicons/react/solid';

interface ErrorCardProps {
  errorMsg: string;
  onClose: () => void;
}

export default function ErrorCard({ errorMsg, onClose }: ErrorCardProps) {
  return (
    <div className="w-full bg-red-100 border border-red-400 px-4 py-3 rounded flex flex-row justify-between items-center">
      <h1 className="text-black">{errorMsg}</h1>
      <XIcon
        className="w-5 h-5 cursor-pointer"
        onClick={() => {
          onClose();
        }}
      />
    </div>
  );
}
