import React from 'react';
import RcInputNumber from 'rc-input-number';

export default class InputNumber extends React.Component<any, any> {
  static propTypes = {};

  static defaultProps = {
    type: 'text',
    disabled: false,
  };

  constructor(props) {
    super(props);
  }

  // upHandler: React.ReactNode =

  render() {

    // const upHandler =

    return <RcInputNumber prefixCls='ic-input-number' {...this.props} />;
  }
}
