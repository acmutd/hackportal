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
          <th className="text-xl p-3 border-2">Scan Name</th>
          <th className="text-xl p-3 border-2">Scan Count</th>
        </tr>
      </thead>
      <tbody>
        {swags.map(({ swag, claimedCount }) => (
          <tr key={swag}>
            <td className="text-xl p-3 border-2">{swag}</td>
            <td className="text-xl p-3 border-2">{claimedCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
