import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export interface OptionState {}

export default class Option extends React.Component<any, any> {
  static propTypes = {
    /**
     * 值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * 是否被选中
     * 默认：false
     */
    hasSelected: PropTypes.bool,
  };

  static defaultProps = {
    hasSelected: false,
  };

  render() {
    const { className, children, hasSelected, ...restProps } = this.props;
    const classes = classNames('ic-select-option', className, {
      'ic-select-option--active': hasSelected,
    });

    return (
      <div className={classes} {...restProps}>
        {children}
      </div>
    );
  }
}
