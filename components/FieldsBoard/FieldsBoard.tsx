import React from 'react';
import classNames from 'classnames';
import PropTypes, { func } from 'prop-types';
import { Button, Drawer, Modal, Icon } from 'antd';
import FieldsSort from './FieldsSort';
import { TypeValue } from './type';
import FieldTypesBoard, { FieldType } from './FieldTypesBoard';
import enquire from 'enquire.js';
import FieldAttributeEdit, { OnSaveFieldParam } from './FieldAttributeEdit';

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

export interface OnAddFieldParam extends OnSaveFieldParam {
  fileType: TypeValue;
}

export interface FieldsBoardProps<T> {
  // 所有字段
  fields: Field<T>[];
  // 选中的字段
  values: Field<T>[];
  // 选中的字段发生改变时的回调
  onChange?: (selectedFields: Field<T>[]) => void;
  // 添加字段的回调
  onAddField: (Field: OnAddFieldParam) => void;
}

interface FieldsBoardState {
  sortDrawerVisible: boolean;
  fieldTypesDrawerVisible: boolean;
  isMobile: boolean;
  fieldEditDrawerVisible: boolean;
  selectedFieldType: TypeValue;
  fieldEditTitle: string;
}

export default class FieldsBoard<T = unknown> extends React.Component<
  FieldsBoardProps<T>,
  FieldsBoardState
> {
  state = {
    sortDrawerVisible: false,
    fieldTypesDrawerVisible: false,
    isMobile: true,
    fieldEditDrawerVisible: true,
    selectedFieldType: TypeValue.SingleChoice,
    fieldEditTitle: '',
  };

  componentDidMount = () => {
    // Mobile
    enquire
      .register('screen and (max-width:768px)', {
        match: () => {
          this.setState({
            isMobile: true,
          });
        },
      })
      // PC
      .register('(min-width: 769px)', {
        match: () => {
          this.setState({
            isMobile: false,
          });
        },
      });
  };

  isSelected = (field: Field) => {
    const { values } = this.props;
    return values.some(value => value.id === field.id);
  };

  handleFieldClick = (field: Field) => {
    const { onChange, values } = this.props;
    if (onChange) {
      let fieldsParam;
      const index = values.findIndex(value => value.id === field.id);
      if (index === -1) {
        fieldsParam = [...values, field];
      } else {
        const newValues = [...values];
        newValues.splice(index, 1);
        fieldsParam = newValues;
      }
      onChange(fieldsParam);
    }
  };

  renderFieldName = (field: Field, total: number, cur: number) => {
    const { name, isMust } = field;
    let ret = '';
    if (total === cur) {
      ret = name;
    }
    ret = `${name},`;

    return isMust ? `*${ret}` : ret;
  };

  handleSort = () => {
    this.setState({ sortDrawerVisible: true });
  };

  handleSortDrawerClose = () => {
    this.setState({ sortDrawerVisible: false });
  };

  handleFieldsSortChange = (fields: Field<T>[]) => {
    this.setState({ sortDrawerVisible: false });
    const { onChange } = this.props;
    onChange && onChange(fields);
  };

  handleAddField = () => {
    this.setState({ fieldTypesDrawerVisible: true });
  };

  handleFieldTypesDrawerClose = () => {
    this.setState({ fieldTypesDrawerVisible: false });
  };

  handleFieldTypeSelect = (fieldType: FieldType) => {
    this.setState({
      fieldTypesDrawerVisible: false,
      selectedFieldType: fieldType.id,
      fieldEditDrawerVisible: true,
      fieldEditTitle: '自定义字段',
    });
  };

  handleAttributeEditClose = () => {
    this.setState({ fieldEditDrawerVisible: false });
  };

  handleSave = (field: OnSaveFieldParam) => {
    const { selectedFieldType } = this.state;
    this.setState({ fieldEditDrawerVisible: false });
    const { onAddField } = this.props;
    onAddField && onAddField({ ...field, fileType: selectedFieldType });
  };

  renderFieldAttributeEdit = () => {
    const {
      fieldEditDrawerVisible,
      selectedFieldType,
      fieldEditTitle,
    } = this.state;
    return (
      <Drawer
        visible={fieldEditDrawerVisible}
        className="fields-board__drawer"
        closable={false}
        mask
        maskClosable
        width="320"
      >
        <FieldAttributeEdit
          fieldType={selectedFieldType}
          onClose={this.handleAttributeEditClose}
          title={fieldEditTitle}
          onSave={this.handleSave}
        />
      </Drawer>
    );
  };

  renderFieldTypesBoard = () => {
    const { fieldTypesDrawerVisible } = this.state;
    const { isMobile } = this.state;

    if (isMobile) {
      return (
        <Drawer
          visible={fieldTypesDrawerVisible}
          className="fields-board__drawer"
          placement="bottom"
          closable={false}
          mask
          maskClosable
        >
          <FieldTypesBoard
            onClose={this.handleFieldTypesDrawerClose}
            onSelect={this.handleFieldTypeSelect}
          />
        </Drawer>
      );
    }

    return (
      <Modal
        visible={fieldTypesDrawerVisible}
        className="fields-board__modal"
        closable={false}
        mask
        maskClosable
        footer={null}
      >
        <FieldTypesBoard
          onClose={this.handleFieldTypesDrawerClose}
          onSelect={this.handleFieldTypeSelect}
        />
      </Modal>
    );
  };

  render() {
    const { fields, values } = this.props;
    const { sortDrawerVisible, fieldTypesDrawerVisible } = this.state;

    return (
      <div className="fields-board">
        <div className="fields-board__label">
          <span>已选字段(*代表必选)</span>
          <span
            role="button"
            className="fields-board__sort-btn"
            onClick={this.handleSort}
          >
            点击排序
          </span>
        </div>
        <div className="fields-board__selected-fields">
          {values.map((value, index) => (
            <span className="fields-board__selected-field" key={value.id}>
              {this.renderFieldName(value, values.length - 1, index)}
            </span>
          ))}
        </div>
        <div className="fields-board__label">点击选择需要填写的信息</div>
        <div className="fields-board__fields">
          {fields.map(field => (
            <div
              className={classNames('fields-board__field', {
                'fields-board__field--selected': this.isSelected(field),
              })}
              role="button"
              onClick={() => this.handleFieldClick(field)}
              key={field.id}
            >
              {field.name}
            </div>
          ))}
        </div>
        <div className="fields-board__add-btn-wrapper">
          <Button type="primary" size="small" onClick={this.handleAddField}>
            添加字段
          </Button>
        </div>

        <Drawer
          visible={sortDrawerVisible}
          width="320"
          onClose={this.handleSortDrawerClose}
          closable={false}
          className="fields-board__drawer"
          destroyOnClose
        >
          <FieldsSort
            fields={values}
            onBack={this.handleSortDrawerClose}
            onChange={this.handleFieldsSortChange}
          />
        </Drawer>

        {this.renderFieldAttributeEdit()}

        {this.renderFieldTypesBoard()}
      </div>
    );
  }
}
