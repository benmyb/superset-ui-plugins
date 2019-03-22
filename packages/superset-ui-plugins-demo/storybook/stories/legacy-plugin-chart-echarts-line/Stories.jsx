/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-line"
        chartProps={{
          formData: {
            sliceId: 1,
            colorScheme: 'bnbColors',
            pshowMulti: true,
            dshowMulti: true,
          },
          height: 600,
          width: 1500,
          payload: {
            data: [
              ['timestamp', '1237556', '1281471', '1253200', '1233881'],
              [1552492800000, 302292, 79984, 275954, 629850],
              [1552579200000, 349875, 89982, 329945, 713830],
              [1552665600000, 386262, 74985, 377937, 739024],
              [1552752000000, 459036, 109978, 473921, 953173],
              [1552838400000, 319086, 79984, 401933, 558467],
              [1552924800000, 293895, 44991, 383936, 604656],
              [1553011200000, 355473, 54989, 395934, 655044],
            ],
          },
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-line|EchartsLineChartPlugin',
  },
];
