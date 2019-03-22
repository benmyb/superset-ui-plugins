/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-funnel"
        chartProps={{
          formData: {
            sliceId: 1,
            colorScheme: 'bnbColors',
            groupby: 'goods_id',
            orderDesc: true,
          },
          height: 600,
          width: 1500,
          payload: {
            data: {
              sortby: 'sum__impression',
              col_index: [
                '1233881',
                '1253200',
                '1238005',
                '1286904',
                '1237300',
                '1188819',
                '1100215',
                '1237556',
                '1205595',
                '1220932',
              ],
              raw_data_col: [
                'sum__impression',
                'sum__detail_view',
                'sum__click',
                'sum__add',
                'sum__checkout',
              ],
              raw_data: [
                [8389154, 120159, 99530, 6532, 5465],
                [6884497, 95422, 68098, 3137, 2597],
                [5971515, 43685, 39743, 2301, 1515],
                [5751388, 87827, 68551, 3376, 2455],
                [4091850, 47038, 35471, 2368, 2077],
                [3782752, 45175, 38469, 3588, 2902],
                [3780181, 77184, 38619, 1849, 1597],
                [3601710, 58848, 48344, 5121, 4790],
                [3098347, 70177, 43849, 6127, 5582],
                [2902523, 63115, 39371, 3614, 3519],
              ],
              percent_col: [
                'sum__detail_view/sum__impression',
                'sum__click/sum__detail_view',
                'sum__add/sum__click',
                'sum__checkout/sum__add',
              ],
              percent_data: [
                [1.43, 82.83, 6.56, 83.66],
                [1.38, 71.36, 4.6, 82.78],
                [0.73, 90.97, 5.78, 65.84],
                [1.52, 78.05, 4.92, 72.71],
                [1.14, 75.4, 6.67, 87.71],
                [1.19, 85.15, 9.32, 80.88],
                [2.04, 50.03, 4.78, 86.37],
                [1.63, 82.15, 10.59, 93.53],
                [2.26, 62.48, 13.97, 91.1],
                [2.17, 62.37, 9.17, 97.37],
              ],
            },
          },
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-funnel|EchartsFunnelChartPlugin',
  },
];
