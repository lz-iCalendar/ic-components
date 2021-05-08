import React from 'react';
import classNames from 'classnames';
import { Button, Drawer, Modal, Input } from 'antd';
import FieldsSort from './FieldsSort';
import { TypeValue, Option } from './type';
import FieldTypesBoard, { FieldType } from './FieldTypesBoard';

import FieldAttributeEdit, { OnSaveParam } from './FieldAttributeEdit';

export type TypeMap = {
  value: TypeValue;
  options?: Option[];
  regionList?: unknown;
};
export interface Field {
  id: string;
  type: TypeMap;
  name: string;
  isMust?: boolean;
  desc?: string;
  defaultValue?: string;
  max?: number;
}

export type OnAddFieldParam = Omit<Field, 'id'>;

export interface FieldsBoardProps {
  // 标题
  title?: string;
  // 所有字段
  fields: Field[];
  // 选中的字段
  values: Field[];
  // 标题改变时的回调
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 选中的字段发生改变时的回调
  onChange?: (selectedFields: Field[]) => void;
  // 添加字段的回调
  onAddField: (field: OnAddFieldParam) => void;
  // 选择字段的回调
  onSelectField: (field: Field) => void;
  // 取消选择字段的回调
  onCancelSelectField: (field: Field) => void;
}

interface FieldsBoardState {
  sortDrawerVisible: boolean;
  fieldTypesDrawerVisible: boolean;
  isMobile: boolean;
  fieldEditDrawerVisible: boolean;
  selectedFieldType: TypeValue;
  fieldEditTitle: string;
  fieldActionVisible: boolean;
  clickedField: Field;
  clickedFieldIsSelected: boolean;
}

export default class FieldsBoard extends React.Component<
  FieldsBoardProps,
  FieldsBoardState
> {
  static defaultProps = {
    fields: [],
    values: [],
  };

  state = {
    sortDrawerVisible: false,
    fieldTypesDrawerVisible: false,
    isMobile: true,
    fieldEditDrawerVisible: false,
    selectedFieldType: TypeValue.SingleChoice,
    fieldEditTitle: '',
    fieldActionVisible: false,
    clickedField: null,
    clickedFieldIsSelected: false,
  };

  componentDidMount = () => {
    const enquire = require('enquire.js');
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
    const { values } = this.props;

    const index = values.findIndex(value => value.id === field.id);
    let isSelected = true;
    if (index === -1) {
      isSelected = false;
    }
    this.setState({
      fieldActionVisible: true,
      clickedField: field,
      clickedFieldIsSelected: isSelected,
    });
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

  handleFieldsSortChange = (fields: Field[]) => {
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

  handleSave = (field: OnSaveParam) => {
    const { selectedFieldType } = this.state;
    this.setState({ fieldEditDrawerVisible: false });
    const { onAddField } = this.props;

    const { name, isMust, desc, defaultValue, max, options } = field;
    const onAddFieldParam: OnAddFieldParam = {
      type: {
        value: selectedFieldType,
        options,
      },
      name,
      isMust,
      desc,
      defaultValue,
      max,
    };
    onAddField && onAddField(onAddFieldParam);
  };

  renderFieldAttributeEdit = () => {
    const {
      fieldEditDrawerVisible,
      selectedFieldType,
      fieldEditTitle,
      clickedField,
    } = this.state;

    let name: string;
    let desc: string;
    let defaultValue: string;
    let isMust: boolean;
    let max: number;
    let options: Option[];
    let type: TypeValue;

    if (clickedField) {
      name = clickedField.name;
      desc = clickedField.desc;
      defaultValue = clickedField.default;
      isMust = clickedField.isMust;
      max = clickedField.max;
      type = clickedField.type;
      options = clickedField.options;
    }

    return (
      <Drawer
        visible={fieldEditDrawerVisible}
        className="fields-board__drawer"
        closable={false}
        mask
        maskClosable
        width="320"
        destroyOnClose
      >
        <FieldAttributeEdit
          fieldType={type}
          onClose={this.handleAttributeEditClose}
          title={fieldEditTitle}
          onSave={this.handleSave}
          name={name}
          desc={desc}
          defaultValue={defaultValue}
          isMust={isMust}
          max={max}
          options={options}
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
          destroyOnClose
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

  handleFirstActionClick = () => {
    const { clickedField, clickedFieldIsSelected } = this.state;
    const { onChange, values, onSelectField, onCancelSelectField } = this.props;
    const field = clickedField;

    if (clickedFieldIsSelected) {
      onCancelSelectField && onCancelSelectField(field);
    } else {
      onSelectField && onSelectField(field);
    }

    this.setState({ fieldActionVisible: false });
  };

  handleEditFieldClick = () => {
    this.setState({
      fieldActionVisible: false,
      fieldEditDrawerVisible: true,
      fieldEditTitle: '编辑字段',
    });
  };

  renderActions = () => {
    const { clickedFieldIsSelected } = this.state;
    let firstActionText = '确认选择';
    if (clickedFieldIsSelected) {
      firstActionText = '取消选择';
    }

    return (
      <div className="fields-board__actions-wrapper">
        <div
          onClick={this.handleFirstActionClick}
          className="fields-board__first-action"
        >
          {firstActionText}
        </div>
        <div
          onClick={this.handleEditFieldClick}
          className="fields-board__edit-action"
        >
          编辑字段
        </div>
      </div>
    );
  };

  renderFieldActions = () => {
    const { fieldActionVisible } = this.state;

    return (
      <Modal
        visible={fieldActionVisible}
        footer={null}
        className="fields-board__actions-modal"
        onCancel={() => this.setState({ fieldActionVisible: false })}
      >
        {this.renderActions()}
      </Modal>
    );
  };

  render() {
    const { fields, values, title, onTitleChange } = this.props;
    const { sortDrawerVisible } = this.state;

    return (
      <div className="fields-board">
        <div className="fields-board__label">
          <span>表单标题</span>
        </div>
        <Input
          className="fields-board__form-title"
          value={title}
          onChange={onTitleChange}
        />
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

        {this.renderFieldActions()}
      </div>
    );
  }
}
