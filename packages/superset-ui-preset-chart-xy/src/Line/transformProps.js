/* eslint-disable sort-keys */

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { encoding } = formData;
  const { data } = payload;

  return {
    data: data.map(({ keys, values }) => ({
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
