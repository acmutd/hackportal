import { Animation, EventTracker, Palette } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  Tooltip,
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
      <Chart data={items} rotated={window.innerWidth <= 1000}>
        <Palette
          scheme={['#3FB98E', '#00CDFF', '#A6E5FF', '#CDC4FF', '#FFD9FA', '#DAFFD1', '#F9FFD1']}
        />
        <ArgumentAxis />
        <ValueAxis
          labelComponent={removeDecimalPointLabel}
          gridComponent={removeDecimalPointLine}
        />

        <BarSeries valueField="itemCount" argumentField="itemName" />

        <EventTracker />
        <Tooltip />
        <Title text={name} />
        <Animation />
      </Chart>
    </div>
  );
}
