import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

const CONTAINER_STYLE = { padding: 8 };

class TooltipFrame extends React.PureComponent {
  render() {
    const { className, children } = this.props;

    return (
      <div className={className} style={CONTAINER_STYLE}>
        {children}
      </div>
    );
  }
}

TooltipFrame.propTypes = propTypes;
TooltipFrame.defaultProps = defaultProps;

export default TooltipFrame;
