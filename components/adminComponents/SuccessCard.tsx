interface SuccessCardProps {
  msg: string;
}

export default function SuccessCard({ msg }: SuccessCardProps) {
  return (
    <div className="w-full bg-green-200 border border-green-800 px-4 py-3 rounded flex flex-row justify-between items-center">
      <h1 className="text-green-900">{msg}</h1>
    </div>
  );
}
