import { ResponsiveBar } from '@nivo/bar';

interface NivoBarChartProps {
  name: string;
  totalCheckIns: number;
  totalHackers: number;
  items: Array<
    {
      itemName: string;
    } & any
  >;
}

export default function NivoBarChart({
  name,
  totalCheckIns,
  totalHackers,
  items,
}: NivoBarChartProps) {
  return (
    <div style={{ height: 650 }} className="border-2 my-2 rounded-2xl md:p-6">
      <h1 className="text-2xl font-bold text-center">{name}</h1>
      <ResponsiveBar
        data={items}
        indexBy="itemName"
        keys={[name]}
        margin={{ top: 50, right: 60, bottom: 160, left: 60 }}
        padding={0.3}
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
          tickRotation: 40,
          legendPosition: 'middle',
        }}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: 'white',
              },
              text: {
                fill: 'white',
              },
            },
          },
        }}
        tooltip={({ data, value, color }) => {
          return (
            <div className="bg-white p-4 rounded-md">
              <div className="flex flex-row items-center justify-between space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <h1 className="text-black">
                  {data.itemName} - <span className="font-bold">{value}</span> (
                  {name === 'Scans'
                    ? `${((value * 100) / totalCheckIns).toFixed(2)}%)`
                    : `${((value * 100) / totalHackers).toFixed(2)}%)`}
                </h1>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
