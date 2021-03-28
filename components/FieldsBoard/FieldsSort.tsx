import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';

export enum TypeValue {
  SingleLineText,
  ParagraphText,
  Number,
  Date,
  Time,
  SingleChoice,
  MultipleChoice,
  DropDown,
  Image,
  Email,
  Region,
  Location,
}

export interface Option {
  label: string;
  value: string;
}

export interface Field<T = unknown> {
  id: string;
  type: TypeValue;
  name: string;
  isMust?: boolean;
  desc?: string;
  default?: T;
  max?: number;
  options?: Option[];
  regionList?: unknown;
}

export interface FieldsSortProps<T> {
  fields: Field<T>[];
  onBack: () => void;
  onChange?: (fields: Field<T>[]) => void;
}

interface FieldsSortState<T> {
  fields: Field<T>[];
}

export default class FieldsSort<T = unknown> extends React.Component<
  FieldsSortProps<T>,
  FieldsSortState<T>
> {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields,
    };
  }

  handleBack = () => {
    const { onBack } = this.props;
    onBack && onBack();
  };

  handleSave = () => {
    const { onChange } = this.props;
    onChange && onChange(this.state.fields);
  };

  swap = (arr: any[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  handleUp = (field: Field, total: number, cur: number, fields: Field<T>[]) => {
    if (cur === 0) {
      return;
    }
    this.swap(fields, cur, cur - 1);
    this.setState({ fields });
  };
  handleDown = (
    field: Field,
    total: number,
    cur: number,
    fields: Field<T>[]
  ) => {
    if (cur === total) {
      return;
    }
    this.swap(fields, cur, cur + 1);
    this.setState({ fields });
  };

  render() {
    const { fields } = this.state;

    return (
      <div className="fields-sort">
        <div className="fields-sort__header">
          <Icon
            type="arrow-left"
            className="fields-sort__back-btn"
            onClick={this.handleBack}
          />
          <span className="fields-sort__header-title">字段排序</span>
        </div>

        <div className="fields-sort__content">
          <div className="fields-sort__tip">
            点击右侧箭头图标，可以上下调整顺序
          </div>
          <div className="fields-sort__fields">
            {fields.map((field, index) => (
              <div className="fields-sort__field" key={field.id}>
                <div className="fields-sort__field-name">
                  {field.name}
                  {field.isMust && <span className="fields-sort__must">*</span>}
                </div>

                <div className="fields-sort__btn-wrapper">
                  <Icon
                    type="arrow-up"
                    className="fields-sort__arrow"
                    onClick={() =>
                      this.handleUp(field, fields.length - 1, index, [
                        ...fields,
                      ])
                    }
                  />
                  <Icon
                    type="arrow-down"
                    className="fields-sort__arrow"
                    onClick={() =>
                      this.handleDown(field, fields.length - 1, index, [
                        ...fields,
                      ])
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fields-sort__save-wrapper">
          <Button type="primary" block onClick={this.handleSave}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}
