import { Animation, Palette } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

interface StatsBarChartProps {
  name: string;
  items: Array<{
    itemName: string;
    itemCount: number;
  }>;
}

export default function StatsBarChart({ name, items }: StatsBarChartProps) {
  return (
    <div className="border-2 my-2 rounded-2xl p-6">
      <Chart data={items}>
        <Palette scheme={['#6366F1', '#DE9571', '#5B5DDE', '#6CDE45', '4C9134']} />
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries valueField="itemCount" argumentField="itemName" />
        <Title text={name} />
        <Animation />
      </Chart>
    </div>
  );
}
