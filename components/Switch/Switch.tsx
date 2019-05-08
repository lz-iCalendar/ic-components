import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: Boolean, e: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CheckboxState {}

export default class Switch extends React.Component<CheckboxProps, CheckboxState> {
  static propTypes = {
    /**
     * 是否选中
     * 默认：-
     */
    checked: PropTypes.bool.isRequired,

    /**
     * 变化时的回调
     * 默认：-
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {};

  handleChange = e => {
    const { onChange, checked } = this.props;
    onChange && onChange(!checked, e);
  };

  render() {
    const { checked, style } = this.props;

    const classes = classNames('ic-switch', {
      'ic-switch--checked': checked,
    });

    return (
      <button type="button" role="switch" className={classes} onClick={this.handleChange} style={style}>
        <span className="ic-switch__inner" />
      </button>
    );
  }
}
