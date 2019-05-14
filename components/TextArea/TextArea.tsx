import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export interface TextAreaInterface {
  value?: string;
  onChange?: (e: React.KeyboardEvent) => void;
}

export default class TextArea extends React.Component<TextAreaInterface & any, any> {
  static propTypes = {
    /**
     * 值
     * 默认：-
     */
    value: PropTypes.string,

    /**
     * 内容改变时的回调函数
     * 默认：-
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {};

  render() {
    const { className, ...restProps } = this.props;
    const classes = classNames('ic-text-area', className);
    return <textarea {...restProps} className={classes} />;
  }
}
