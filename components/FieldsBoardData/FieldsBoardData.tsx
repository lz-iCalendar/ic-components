import React from 'react';
import classNames from 'classnames';
import FieldsBoard from '../FieldsBoard';

export interface FieldsBoardProps {
  formManagementResid: string;
}

export interface FieldsBoardState {}

export default class FieldsBoardData extends React.Component<
  FieldsBoardProps,
  FieldsBoardState
> {
  render() {
    const { formManagementResid } = this.props;

    return (
      <div className="fields-board-data">
        {/* <FieldsBoard></FieldsBoard> */}
      </div>
    );
  }
}
