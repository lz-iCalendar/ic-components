import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export interface CheckboxProps {
  checked: boolean;
  onChange: (e: any) => void;
  labelPlacement?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface CheckboxState {}

export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
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

    /**
     * label 所在的位置
     * 默认：'right'
     */
    labelPlacement: PropTypes.oneOf(['right', 'left']),
  };

  static defaultProps = {
    labelPlacement: 'right',
  };

  handleChange = e => {
    const { onChange } = this.props;
    onChange && onChange(e);
  };

  render() {
    const { checked, children, labelPlacement } = this.props;

    const classes = classNames('ic-checkbox', {
      'ic-checkbox--checked': checked,
    });

    return (
      <label className="ic-checkbox__wrapper">
        {labelPlacement === 'left' && <span className="ic-checkbox__label ic-checkbox__label-left">{children}</span>}
        <span className={classes}>
          <input type="checkbox" className="ic-checkbox__input" onChange={this.handleChange} checked={checked} />
          <span className="ic-checkbox__inner" />
        </span>
        {labelPlacement === 'right' && <span className="ic-checkbox__label ic-checkbox__label-right">{children}</span>}
      </label>
    );
  }
}
