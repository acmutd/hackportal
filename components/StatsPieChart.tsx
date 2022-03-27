import { Animation, EventTracker, Palette } from '@devexpress/dx-react-chart';
import { Chart, Legend, PieSeries, Title, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import React from 'react';

interface StatsPieChartProps {
  name: string;
  items: Array<{
    itemName: string;
    itemCount: number;
  }>;
}

export default function StatsPieChart({ name, items }: StatsPieChartProps) {
  return (
    <div className="w-full flex-grow border-2 my-2 rounded-2xl p-6">
      <Chart data={items}>
        <Palette
          scheme={['#3FB98E', '#00CDFF', '#A6E5FF', '#CDC4FF', '#FFD9FA', '#DAFFD1', '#F9FFD1']}
        />

        <PieSeries valueField="itemCount" argumentField="itemName" />
        <Title text={name} />
        <Legend />
        <EventTracker />
        <Tooltip />
        <Animation />
      </Chart>
    </div>
  );
}
