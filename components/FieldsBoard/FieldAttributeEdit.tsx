import React from 'react';
import classNames from 'classnames';
import { Input, Switch, Button, message } from 'antd';
import { TypeValue, Option } from './type';
import HeaderFooterFixedLayout from '../HeaderFooterFixedLayout';
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

export type OnSaveFieldParam = Partial<FieldAttributeEditState>;

export interface FieldAttributeEditProps {
  title: string;
  fieldType: TypeValue;
  onClose?: () => void;
  onSave?: (Field: OnSaveFieldParam) => void;
}

export interface FieldAttributeEditState {
  name: string;
  desc: string;
  defaultValue: string;
  isMust: boolean;
  max: number;
  options: Option[];
  hasMax: boolean;
  hasOption: boolean;
}

export interface InputWrapperProps {
  label: string;
  value: string;
  isMust?: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper: React.FunctionComponent<InputWrapperProps> = ({
  label,
  isMust,
  placeholder,
  onChange,
  value,
}): JSX.Element => {
  return (
    <label className="field-attribute-edit__input-wrapper">
      <div className="field-attribute-edit__label">
        {label}
        {isMust && <span className="field-attribute-edit__must">*</span>}
      </div>
      <Input
        value={value}
        className="field-attribute-edit__input"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default class FieldAttributeEdit extends React.Component<
  FieldAttributeEditProps,
  FieldAttributeEditState
> {
  constructor(props) {
    super(props);
    const { fieldType, name, desc, defaultValue, isMust, max } = props;

    const hasMax = [
      TypeValue.SingleLineText,
      TypeValue.ParagraphText,
      TypeValue.Number,
    ].includes(fieldType);

    const hasOption = [
      TypeValue.SingleChoice,
      TypeValue.MultipleChoice,
    ].includes(fieldType);

    this.state = {
      name: typeof name === 'string' ? name : '',
      desc: typeof desc === 'string' ? desc : '',
      defaultValue: typeof defaultValue === 'string' ? defaultValue : '',
      isMust: typeof isMust === 'boolean' ? isMust : false,
      max: typeof max === 'number' ? max : 20,
      options: [{ label: '', value: '' }],
      hasMax,
      hasOption,
    };
  }

  handleBack = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ desc: e.target.value });
  };

  handleDefaultValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ defaultValue: e.target.value });
  };

  handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/\d+/.test(value)) {
      return this.setState({ max: 0 });
    }
    this.setState({ max: parseInt(value, 10) });
  };

  handleIsMustChange = (checked: boolean) => {
    this.setState({ isMust: checked });
  };

  handleSave = () => {
    const { onSave } = this.props;
    const { name, options } = this.state;
    if (!name) {
      return message.error('请输入字段名称');
    }

    if (options.some(option => !option.value)) {
      return message.error('选项值不能为空');
    }

    onSave &&
      onSave({
        ...this.state,
      });
  };

  handleOptionChange = (index: number, value: string) => {
    const { options } = this.state;
    const newOptions = [...options];
    newOptions.splice(index, 1, { label: value, value });
    this.setState({ options: newOptions });
  };

  handleAddOption = () => {
    const { options } = this.state;
    this.setState({ options: [...options, { label: '', value: '' }] });
  };

  handleRemoveOption = (index: number) => {
    const newOptions = [...this.state.options];
    if (newOptions.length === 1) {
      return message.error('至少需要一个选项');
    }
    newOptions.splice(index, 1);
    this.setState({ options: newOptions });
  };

  render() {
    const { title } = this.props;
    const {
      name,
      desc,
      defaultValue,
      isMust,
      max,
      options,
      hasMax,
      hasOption,
    } = this.state;

    return (
      <div className="field-attribute-edit">
        <HeaderFooterFixedLayout
          headerClassName="field-attribute-edit__header"
          header={
            <>
              {/* <Icon
                type="arrow-left"
                className="field-attribute-edit__back-btn"
                onClick={this.handleBack}
              /> */}
              {/* 
              // @ts-ignore */}
              <ArrowLeftOutlined
                className="field-attribute-edit__back-btn"
                onClick={this.handleBack}
              />
              <span className="field-attribute-edit__header-title">
                {title}
              </span>
            </>
          }
          content={
            <div className="field-attribute-edit__content">
              <InputWrapper
                label="字段名称"
                isMust
                placeholder="请输入字段名称"
                value={name}
                onChange={this.handleNameChange}
              />
              <InputWrapper
                label="字段描述"
                isMust
                placeholder="请说明该字段怎么填写（选填）"
                value={desc}
                onChange={this.handleDescChange}
              />
              <InputWrapper
                label="默认值"
                isMust
                placeholder="该字段的默认值（选填）"
                value={defaultValue}
                onChange={this.handleDefaultValueChange}
              />
              {hasOption && (
                <>
                  <div className="field-attribute-edit__label">选项</div>
                  {options.map((option, index) => (
                    <div className="field-attribute-edit__option" key={index}>
                      <div className="field-attribute-edit__option-remove-btn-wrapper">
                        {/* 
                        // @ts-ignore */}
                        <MinusCircleOutlined
                          className="field-attribute-edit__option-remove-btn"
                          onClick={() => this.handleRemoveOption(index)}
                        />
                      </div>
                      <Input
                        className="field-attribute-edit__option-input"
                        placeholder="请输入选项（30字以内）"
                        value={option.value}
                        onChange={e =>
                          this.handleOptionChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <div className="field-attribute-edit__add-option">
                    <div className="field-attribute-edit__add-option-btn-wrapper">
                      {/* 
                        // @ts-ignore */}
                      <PlusCircleOutlined className="field-attribute-edit__add-option-btn" />
                    </div>

                    <div
                      className="field-attribute-edit__add-option-title"
                      onClick={this.handleAddOption}
                    >
                      添加单个选项
                    </div>
                  </div>
                </>
              )}

              <div className="field-attribute-edit__label">设置</div>

              {hasMax && (
                <label className="field-attribute-edit__max-size">
                  <span className="field-attribute-edit__max-size-title">
                    最多字符数
                  </span>
                  <Input
                    className="field-attribute-edit__max-size-input"
                    dir="rtl"
                    value={max}
                    onChange={this.handleMaxChange}
                  />
                </label>
              )}

              <label className="field-attribute-edit__is-must">
                <span className="field-attribute-edit__is-must-title">
                  是否必选项
                </span>
                <Switch
                  className="field-attribute-edit__is-must-checkbox"
                  checked={isMust}
                  onChange={this.handleIsMustChange}
                />
              </label>
            </div>
          }
          footer={
            <div className="field-attribute-edit__save-btn-wrapper">
              <Button type="primary" block onClick={this.handleSave}>
                保存
              </Button>
            </div>
          }
        />
      </div>
    );
  }
}
