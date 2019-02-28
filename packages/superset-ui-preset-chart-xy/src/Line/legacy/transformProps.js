import { getNumberFormatter } from '@superset-ui/number-format';
import { getTimeFormatter } from '@superset-ui/time-format';

/* eslint-disable sort-keys */

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { colorScheme, xAxisLabel, xAxisFormat, yAxisLabel, yAxisFormat } = formData;

  return {
    data: payload.data.map(({ key, values }) => {
      const keys = { name: key[0] };

      return {
        seriesKey: key.join('/'),
        keys,
        values: values.map(v => ({
          ...v,
          // y: Math.random() < 0.1 ? null : v.y,
        })),
      };
    }),
    width,
    height,
    encoding: {
      x: {
        field: 'x',
        type: 'temporal',
        scale: {
          type: 'time',
        },
        axis: {
          orientation: 'bottom',
          label: xAxisLabel,
          // numTicks: 5,
          tickFormat: getTimeFormatter(xAxisFormat),
        },
      },
      y: {
        field: 'y',
        type: 'quantitative',
        scale: {
          type: 'linear',
        },
        axis: {
          orientation: 'left',
          label: yAxisLabel,
          tickFormat: getNumberFormatter(yAxisFormat),
        },
      },
      color: {
        field: 'name',
        type: 'nominal',
        scale: {
          scheme: colorScheme,
        },
        legend: true,
      },
    },
  };
}
