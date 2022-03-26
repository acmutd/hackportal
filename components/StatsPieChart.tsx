import { Animation, Palette } from '@devexpress/dx-react-chart';
import { Chart, Legend, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
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
        <Palette scheme={['#6366F1', '#DEB471', '#5B5DDE', '#D7DE45', '#509DDE']} />

        <PieSeries valueField="itemCount" argumentField="itemName" />
        <Title text={name} />
        <Legend />
        <Animation />
      </Chart>
    </div>
  );
}
