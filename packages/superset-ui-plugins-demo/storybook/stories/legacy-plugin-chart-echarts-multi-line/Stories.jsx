/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-multi-line"
        chartProps={{
          formData: {
            sliceId: 1,
            colorScheme: 'bnbColors',
            numberFormat: '.3s',
            showEnlarge: true,
            rowNumber: 3,
          },
          height: 600,
          width: 1500,
          payload: {
            data: {
              mertics: ['count'],
              groupby_order: ['DE', 'US', 'GB'],
              raw_data: {
                DE: {
                  count: [
                    [1552492800000, 12326507.0],
                    [1552579200000, 13747324.0],
                    [1552665600000, 15948745.0],
                    [1552752000000, 20619181.0],
                    [1552838400000, 14913358.0],
                    [1552924800000, 12030836.0],
                    [1553011200000, 10499955.0],
                  ],
                },
                US: {
                  count: [
                    [1552492800000, 9393212.0],
                    [1552579200000, 10058054.0],
                    [1552665600000, 10285005.0],
                    [1552752000000, 10446903.0],
                    [1552838400000, 10011312.0],
                    [1552924800000, 9085769.0],
                    [1553011200000, 9798290.0],
                  ],
                },
                GB: {
                  count: [
                    [1552492800000, 5134322.0],
                    [1552579200000, 5913673.0],
                    [1552665600000, 8760123.0],
                    [1552752000000, 8790420.0],
                    [1552838400000, 7930810.0],
                    [1552924800000, 8190655.0],
                    [1553011200000, 6175621.0],
                  ],
                },
              },
            },
          },
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-multi-line|EchartsMultiLineChartPlugin',
  },
];
