import { Animation, EventTracker, Palette } from '@devexpress/dx-react-chart';
import { Chart, Legend, PieSeries, Title, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import React, { useState } from 'react';

interface StatsPieChartProps {
  name: string;
  fieldName: string;
  statsData: Record<string, GeneralStats>;
  rolesDict: Record<string, boolean>;
}

export default function StatsPieChart({
  name,
  fieldName,
  statsData,
  rolesDict,
}: StatsPieChartProps) {
  const items = Object.entries(
    Object.entries(statsData)
      .filter(([k, _]) => rolesDict[k])
      .map(([k, v]) => v[fieldName])
      .reduce((acc: Record<string, number>, curr: Record<string, number>) => {
        for (let key of Object.keys(curr)) {
          if (!acc.hasOwnProperty(key)) acc[key] = curr[key];
          else acc[key] += curr[key];
        }
        return acc;
      }, {}) as Record<string, number>,
  ).map(([k, v]) => ({ itemName: k, itemCount: v }));

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
