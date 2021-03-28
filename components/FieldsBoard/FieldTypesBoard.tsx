import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { TypeValue } from './type';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2446793_0kgwyprr1y0c.js',
});

export interface FieldType {
  id: TypeValue;
  label: string;
  icon: JSX.Element;
}

export const fieldTypes: FieldType[] = [
  {
    id: TypeValue.SingleLineText,
    label: '单行文本',
    icon: (
      <IconFont type="icon-single-text" className="field-types-board__icon" />
    ),
  },
  {
    id: TypeValue.ParagraphText,
    label: '多行文本',
    icon: (
      <IconFont
        type="icon-paragraph-text"
        className="field-types-board__icon"
      />
    ),
  },
  {
    id: TypeValue.Number,
    label: '数字',
    icon: <IconFont type="icon-number" className="field-types-board__icon" />,
  },
  {
    id: TypeValue.Date,
    label: '日期',
    icon: <IconFont type="icon-date" className="field-types-board__icon" />,
  },
  {
    id: TypeValue.Time,
    label: '时间',
    icon: <IconFont type="icon-time" className="field-types-board__icon" />,
  },
  {
    id: TypeValue.SingleChoice,
    label: '单项选择',
    icon: (
      <IconFont type="icon-single-choice" className="field-types-board__icon" />
    ),
  },
  {
    id: TypeValue.MultipleChoice,
    label: '多项选择',
    icon: (
      <IconFont type="icon-multi-choice" className="field-types-board__icon" />
    ),
  },
  {
    id: TypeValue.Image,
    label: '图片',
    icon: <IconFont type="icon-image" className="field-types-board__icon" />,
  },
  {
    id: TypeValue.Email,
    label: '邮箱',
    icon: <IconFont type="icon-email" className="field-types-board__icon" />,
  },
  {
    id: TypeValue.Region,
    label: '地区',
    icon: <IconFont type="icon-region" className="field-types-board__icon" />,
  },
  {
    id: TypeValue.Location,
    label: '位置',
    icon: <IconFont type="icon-location" className="field-types-board__icon" />,
  },
];

export interface FieldTypesBoardProps {
  onClose?: () => void;
  onSelect?: (fieldType: FieldType) => void;
}

interface FieldTypesBoardState {}

export default class FieldTypesBoard extends React.Component<
  FieldTypesBoardProps,
  FieldTypesBoardState
> {
  handleClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  handleTypeClick = (fieldType: FieldType) => {
    const { onSelect } = this.props;
    onSelect && onSelect(fieldType);
  };

  render() {
    return (
      <div className="field-types-board">
        <div className="field-types-board__close" onClick={this.handleClose}>
          <Icon type="close" />
        </div>
        <div className="field-types-board__header">请选择字段类型</div>
        <div className="field-types-board__filed-types">
          {fieldTypes.map(fieldType => (
            <div
              key={fieldType.id}
              className="field-types-board__type-wrapper"
              onClick={() => this.handleTypeClick(fieldType)}
            >
              <span className="field-types-board__icon-wrapper">
                {fieldType.icon}
              </span>
              <span>{fieldType.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
