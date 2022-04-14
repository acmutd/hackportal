interface AdminStatsCardProps {
  title: string;
  value: number;
}

export default function AdminStatsCard({ title, value }: AdminStatsCardProps) {
  return (
    <div className="border-2 border-black p-5 flex flex-col rounded-xl">
      <h1 className="text-3xl text-center">{value}</h1>
      <h1 className="text-xl text-center">{title}</h1>
    </div>
  );
}
