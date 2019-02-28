/* eslint-disable no-magic-numbers, sort-keys */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => [
      <SuperChart
        key="line1"
        chartType="v2-line"
        chartProps={{
          datasource: { verboseMap: {} },
          formData: {
            encoding: {
              x: {
                field: 'x',
                scale: {
                  type: 'time',
                },
                axis: {
                  orientation: 'bottom',
                  label: 'Time',
                  // numTicks: 5,
                  tickFormat: '%Y',
                },
              },
              y: {
                field: 'y',
                scale: {
                  type: 'linear',
                },
                axis: {
                  orientation: 'left',
                  label: 'Score',
                },
              },
              color: {
                field: 'fields.name',
                scale: {},
                legend: true,
              },
              strokeDashArray: {
                field: 'fields.timeOffset',
                scale: {
                  type: 'ordinal',
                  domain: ['now', 'last year'],
                  range: ['4 4', ''],
                },
              },
            },
          },
          height: 400,
          payload: { data },
          width: 400,
        }}
      />,
    ],
    storyName: 'Basic',
    storyPath: 'preset-chart-xy|LineChartPlugin',
  },
];
