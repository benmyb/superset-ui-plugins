export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { sliceId, colorScheme, numberFormat, pshowMulti, dshowMulti } = formData;

  return {
    width,
    height,
    sliceId,
    data: payload.data,
    colorScheme,
    numberFormat,
    pshowMulti,
    dshowMulti,
  };
}
