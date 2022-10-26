import { ResponsiveBar } from '@nivo/bar';

interface NivoBarChartProps {
  name: string;
  items: Array<{
    itemName: string;
    itemValue: string;
  }>;
}

export default function NivoBarChart({ name, items }: NivoBarChartProps) {
  const longestKey = items.reduce((prev, curr) => Math.max(prev, curr.itemName.length), 0);
  const items_ = items.map(({ itemName, itemValue }) => ({
    itemName,
    [name]: itemValue,
  }));
  return (
    <div style={{ height: 650 }} className="border-2 my-2 rounded-2xl md:p-6">
      <h1 className="text-2xl font-bold text-center">{name}</h1>
      <ResponsiveBar
        data={items_}
        indexBy="itemName"
        keys={[name]}
        margin={{ top: 50, right: 130, bottom: 110, left: 60 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#3FB98E', '#00CDFF', '#A6E5FF', '#CDC4FF', '#FFD9FA', '#DAFFD1', '#F9FFD1']}
        colorBy="indexValue"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        axisBottom={{
          tickRotation: longestKey >= 20 ? 30 : 0,
          legendPosition: 'middle',
        }}
      />
    </div>
  );
}
