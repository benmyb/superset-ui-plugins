import { getNumberFormatter } from '@superset-ui/number-format';
import { getTimeFormatter } from '@superset-ui/time-format';

/* eslint-disable sort-keys */

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { colorScheme, xAxisLabel, xAxisFormat, yAxisLabel, yAxisFormat } = formData;

  return {
    data: payload.data.map(({ key, values }) => ({
      key: { name: key[0] },
      values,
    })),
    width,
    height,
    encoding: {
      x: {
        field: 'x',
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
        field: 'key.name',
        scale: {
          scheme: colorScheme,
        },
        legend: true,
      },
    },
  };
}
