/* eslint-disable no-magic-numbers */

import React from 'react';

export default function createTooltip(spec, data) {
  /* eslint-disable-next-line */
  return ({ datum, series }) => (
    <div style={{ padding: 8 }}>
      <div>
        <strong>{spec.encoding.x.axis.tickFormat(datum.x)}</strong>
      </div>
      <br />
      {series && (
        <table>
          <tbody>
            {data
              .filter(({ seriesKey }) => series[seriesKey])
              .concat()
              .sort((a, b) => series[b.seriesKey].y - series[a.seriesKey].y)
              .map(({ seriesKey, color }) => (
                <tr key={seriesKey}>
                  <td
                    style={{
                      color,
                      fontWeight: series[seriesKey] === datum ? 600 : 200,
                    }}
                  >
                    {`${seriesKey} `}
                  </td>
                  <td style={{ paddingLeft: 10, textAlign: 'right' }}>
                    {spec.encoding.y.axis.tickFormat(series[seriesKey].y)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
