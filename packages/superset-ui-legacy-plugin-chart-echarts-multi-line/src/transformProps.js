export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { sliceId, colorScheme, numberFormat, showEnlarge, rowNumber } = formData;

  return {
    width,
    height,
    sliceId,
    data: payload.data,
    colorScheme,
    numberFormat,
    rowNumber,
    showEnlarge,
  };
}
