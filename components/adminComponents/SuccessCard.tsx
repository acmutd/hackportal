interface SuccessCardProps {
  msg: string;
}

export default function SuccessCard({ msg }: SuccessCardProps) {
  return (
    <div className="w-full bg-green-500 py-2 px-4 rounded-xl flex flex-row justify-between items-center">
      <h1 className="text-white">{msg}</h1>
    </div>
  );
}
