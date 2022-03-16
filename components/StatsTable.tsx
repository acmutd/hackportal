interface StatsTableProps {
  name: string;
  items: Array<{
    itemName: string;
    itemCount: number;
  }>;
}

export default function StatsTable({ name, items }: StatsTableProps) {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="text-xl p-3 border-2">{name}</th>
          <th className="text-xl p-3 border-2">Count</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ itemName, itemCount }) => (
          <tr key={itemName}>
            <td className="text-xl p-3 border-2">{itemName}</td>
            <td className="text-xl p-3 border-2">{itemCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
