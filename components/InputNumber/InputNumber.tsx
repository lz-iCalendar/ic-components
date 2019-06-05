import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import RcInputNumber from 'rc-input-number'

export default class InputNumber extends React.Component<any, any> {
  static propTypes = {

  };

  static defaultProps = {
    type: 'text',
    disabled: false,
  };

  constructor(props) {
    super(props);
  }

  render() {



    return <RcInputNumber {...this.props} className='12321321312'></RcInputNumber>

  }
}
