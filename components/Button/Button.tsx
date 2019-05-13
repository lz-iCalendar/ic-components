import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Button extends React.Component<any, any> {
  static propTypes = {
    /**
     * 类型
     * 可选：'primary' 普通按钮；'text' 文字按钮
     * 默认：'default'
     */
    type: PropTypes.oneOf(['default', 'primary', 'text']),

    /**
     * 按钮宽度是否为父宽度
     * 默认：false
     */
    block: PropTypes.bool,
  };

  static defaultProps = {
    type: 'default',
    block: false,
  };

  render() {
    const { type, className, children, block, ...restProps } = this.props;
    const classes = classNames(
      'ic-button',
      {
        'ic-button--text': type === 'text',
        'ic-button--block': block,
        'ic-button--primary': type === 'primary',
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
