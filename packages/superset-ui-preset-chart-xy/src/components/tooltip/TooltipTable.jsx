import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      keyStyle: PropTypes.object,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      valueStyle: PropTypes.object,
    }),
  ),
};
const defaultProps = {
  className: '',
  data: [],
};

const VALUE_CELL_STYLE = { paddingLeft: 8, textAlign: 'right' };

class TooltipTable extends React.PureComponent {
  render() {
    const { className, data } = this.props;

    return (
      <table className={className}>
        <tbody>
          {data.map(({ key, keyStyle, value, valueStyle }) => (
            <tr key={key}>
              <td style={keyStyle}>{key}</td>
              <td style={valueStyle ? { ...VALUE_CELL_STYLE, ...valueStyle } : VALUE_CELL_STYLE}>
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

TooltipTable.propTypes = propTypes;
TooltipTable.defaultProps = defaultProps;

export default TooltipTable;
