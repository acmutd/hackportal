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
  const removeDecimalPointLabel = (props) => {
    const { text } = props;
    if (text % 1 !== 0) {
      return null;
    }
    const newProps = {
      ...props,
      text: parseInt(props.text),
    };
    return <ValueAxis.Label {...newProps} />;
  };

  return (
    <div className="border-2 my-2 rounded-2xl md:p-6">
      <Chart data={items} rotated={screen.width <= 768}>
        <Palette scheme={['#BF40BF', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#FF0000']} />
        <ArgumentAxis />
        <ValueAxis labelComponent={removeDecimalPointLabel} />

        <BarSeries valueField="itemCount" argumentField="itemName" />
        <Title text={name} />
        <Animation />
      </Chart>
    </div>
  );
}
