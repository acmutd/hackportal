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
  const coordinates = [];
  /**
   *
   * Removes all decimal point labels on the y-axis
   *
   */
  const removeDecimalPointLabel = (props: ValueAxis.LabelProps) => {
    const { text } = props;
    if ((text as number) % 1 !== 0) {
      return null;
    }
    coordinates.push(props.y);
    const newProps = {
      ...props,
      text: parseInt(props.text as string),
    };
    return <ValueAxis.Label {...newProps} />;
  };

  /**
   *
   * Removes all decimal point lines on the y-axis
   *
   */
  const removeDecimalPointLine = (props: ValueAxis.LineProps) => {
    const { y1 } = props;
    if (coordinates.find((el) => el === y1) === undefined) return null;
    return <ValueAxis.Grid {...props} />;
  };

  return (
    <div className="border-2 my-2 rounded-2xl md:p-6">
      <Chart data={items} rotated={screen.width <= 768}>
        <Palette scheme={['#BF40BF', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#FF0000']} />
        <ArgumentAxis />
        <ValueAxis
          labelComponent={removeDecimalPointLabel}
          gridComponent={removeDecimalPointLine}
        />

        <BarSeries valueField="itemCount" argumentField="itemName" />
        <Title text={name} />
        <Animation />
      </Chart>
    </div>
  );
}
