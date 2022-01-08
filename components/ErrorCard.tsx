import { XIcon } from '@heroicons/react/solid';

interface ErrorCardProps {
  errorMsg: string;
  onClose: () => void;
}

export default function ErrorCard({ errorMsg, onClose }: ErrorCardProps) {
  return (
    <div className="w-full bg-red-200 py-2 px-4 rounded-xl flex flex-row justify-between items-center">
      <XIcon
        className="w-5 h-5 cursor-pointer text-black"
        onClick={() => {
          onClose();
        }}
      />
      <div className="text-black pl-4 flex-grow">{errorMsg}</div>
    </div>
  );
}
