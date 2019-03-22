export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const {
    sliceId,
    colorScheme,
    pshowPercent,
    pshowMulti,
    pshowThumbnail,
    dshowPercent,
    dshowMulti,
    dshowThumbnail,
  } = formData;

  return {
    width,
    height,
    sliceId,
    data: payload.data,
    colorScheme,
    pshowPercent,
    pshowMulti,
    pshowThumbnail,
    dshowPercent,
    dshowMulti,
    dshowThumbnail,
  };
}
