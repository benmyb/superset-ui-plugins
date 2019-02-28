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
              .filter(({ key }) => series[key])
              .concat()
              .sort((a, b) => series[b.key].y - series[a.key].y)
              .map(({ key, color }) => ({
                key,
                keyStyle: {
                  color,
                  fontWeight: series[key] === datum ? 600 : 200,
                },
                value: spec.encoding.y.axis.tickFormat(series[key].y),
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
