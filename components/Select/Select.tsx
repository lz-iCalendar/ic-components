import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export interface CheckboxState {}

export default class Select extends React.Component<any, any> {
  static Option = Option;
  static propTypes = {};

  static defaultProps = {};
  render() {
    return <div>select</div>;
  }
}
