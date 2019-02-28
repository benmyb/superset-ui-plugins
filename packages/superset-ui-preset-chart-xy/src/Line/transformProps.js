import { getNumberFormatter } from '@superset-ui/number-format';
import { getTimeFormatter } from '@superset-ui/time-format';

/* eslint-disable sort-keys */

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { encoding } = formData;

  // hack
  encoding.x.axis.tickFormat = getTimeFormatter(encoding.x.axis.tickFormat);
  encoding.y.axis.tickFormat = getNumberFormatter(encoding.y.axis.tickFormat);

  return {
    data: payload.data.map(({ key, values }) => {
      const fields = { name: key[0] };

      return {
        seriesKey: key.join('/'),
        fields,
        values: values.map(v => ({
          ...v,
          // y: Math.random() < 0.1 ? null : v.y,
        })),
      };
    }),
    width,
    height,
    encoding,
  };
}
