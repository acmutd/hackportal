interface SwagStatsTableProps {
  swags: Array<{
    swag: string;
    claimedCount: number;
  }>;
}

export default function SwagStatsTable({ swags }: SwagStatsTableProps) {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="text-xl p-3 border-2 border-black">Scan Name</th>
          <th className="text-xl p-3 border-2 border-black">Scan Count</th>
        </tr>
      </thead>
      <tbody>
        {swags.map(({ swag, claimedCount }) => (
          <tr key={swag}>
            <td className="text-xl p-3 border-2 border-black">{swag}</td>
            <td className="text-xl p-3 border-2 border-black">{claimedCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
