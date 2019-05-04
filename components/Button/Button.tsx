import React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Button extends React.Component<any, any> {
  static propTypes = {
    /**
     * 类型
     * 可选：'primary' 普通按钮；'text' 文字按钮
     * 默认：'primary'
     */
    type: PropTypes.oneOf(['primary', 'text']),
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    const { type, className, children, ...restProps } = this.props;
    const classes = classNames(
      'ic-button',
      {
        'ic-button__text': type === 'text',
      },
      className
    );

    return (
      <button className={classes} {...restProps}>
        {children}
      </button>
    );
  }
}
