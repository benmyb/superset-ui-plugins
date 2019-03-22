export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { sliceId, colorScheme, groupby, orderDesc } = formData;

  return {
    width,
    height,
    sliceId,
    data: payload.data,
    colorScheme,
    groupby,
    orderDesc,
  };
}
