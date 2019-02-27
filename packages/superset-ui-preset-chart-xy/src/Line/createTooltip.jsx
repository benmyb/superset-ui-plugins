/* eslint-disable no-magic-numbers */

import React from 'react';
import PropTypes from 'prop-types';
import TooltipFrame from '../components/tooltip/TooltipFrame';
import TooltipTable from '../components/tooltip/TooltipTable';

export default function createTooltip(spec, data) {
  const propTypes = {
    datum: PropTypes.shape({
      x: PropTypes.number,
    }),
    series: PropTypes.objectOf(
      PropTypes.shape({
        y: PropTypes.number,
      }),
    ),
  };
  const defaultProps = {
    datum: {},
    series: {},
  };

  function LineTooltip({ datum, series }) {
    return (
      <TooltipFrame>
        <div>
          <strong>{spec.encoding.x.axis.tickFormat(datum.x)}</strong>
        </div>
        <br />
        {series && (
          <TooltipTable
            data={data
              .filter(({ seriesKey }) => series[seriesKey])
              .concat()
              .sort((a, b) => series[b.seriesKey].y - series[a.seriesKey].y)
              .map(({ seriesKey, color }) => ({
                key: seriesKey,
                keyStyle: {
                  color,
                  fontWeight: series[seriesKey] === datum ? 600 : 200,
                },
                value: spec.encoding.y.axis.tickFormat(series[seriesKey].y),
              }))}
          />
        )}
      </TooltipFrame>
    );
  }

  LineTooltip.propTypes = propTypes;
  LineTooltip.defaultProps = defaultProps;

  return LineTooltip;
}
