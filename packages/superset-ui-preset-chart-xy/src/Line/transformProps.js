import { getNumberFormatter } from '@superset-ui/number-format';
import { getTimeFormatter } from '@superset-ui/time-format';

/* eslint-disable sort-keys */

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { encoding } = formData;
  const { data } = payload;

  // hack
  encoding.x.axis.tickFormat = getTimeFormatter(encoding.x.axis.tickFormat);
  encoding.y.axis.tickFormat = getNumberFormatter(encoding.y.axis.tickFormat);

  const keySet = new Set();
  if (data && data.length > 0) {
    payload.data.forEach(({ keys }) => {
      Object.keys(keys).forEach(k => {
        keySet.add(k);
      });
    });
  }
  const fieldNames = [...keySet.values()].sort((a, b) => a.localeCompare(b));

  return {
    data: data.map(({ keys, values }) => ({
      seriesKey: fieldNames.map(f => keys[f]).join('/'),
      keys,
      values: values.map(v => ({
        ...v,
        // y: Math.random() < 0.1 ? null : v.y,
      })),
    })),
    width,
    height,
    encoding,
  };
}
