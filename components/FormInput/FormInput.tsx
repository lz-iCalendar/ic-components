import React from 'react';
import { Option, TypeValue } from '../FieldsBoard/type';
import ControlWrapper from './ControlWrapper';
import HeaderFooterFixedLayout from '../HeaderFooterFixedLayout';
import { Button, message } from 'antd';
import {
  UploadRequestOption,
  BeforeUploadFileType,
  RcFile,
} from 'rc-upload/lib/interface';
import * as EmailValidator from 'email-validator';

export interface Field {
  id: string;
  value?: string;
  type: {
    value: TypeValue;
    options?: Option[];
    regionList?: unknown;
  };
  name: string;
  isMust?: boolean;
  desc?: string;
  default?: string;
  max?: number;
}

export interface Values {
  [key: string]: string;
}

const NOT_NEED_VALID_MAX_CONTROLS = [
  TypeValue.SingleChoice,
  TypeValue.MultipleChoice,
  TypeValue.Email,
  TypeValue.Image,
  TypeValue.Date,
  TypeValue.Time,
  TypeValue.Number,
];

const NEED_VALID_MAX_CONTROLS = [
  TypeValue.SingleLineText,
  TypeValue.ParagraphText,
];

export interface FormInputProps {
  fields: Field[];
  onSelectImage?: (
    file: Exclude<BeforeUploadFileType, File | boolean> | RcFile,
    uploadSuccess: (url: string) => void
  ) => void;
  onSave: (values: Values) => void;
}
export interface FormInputState {
  values: string[];
  errors: string[];
}

export default class FormInput extends React.Component<
  FormInputProps,
  FormInputState
> {
  constructor(props: FormInputProps) {
    super(props);
    const { fields } = props;
    let values: string[] = [];
    let errors: string[] = [];
    fields.forEach(field => {
      values.push(field.value);
      errors.push('');
    });
    this.state = {
      values,
      errors,
    };
  }

  getFieldValueError = (
    rules: {
      isMust: boolean;
      max?: number;
      isEmail?: boolean;
    },
    value: string
  ) => {
    const { isMust, max, isEmail } = rules;
    if (isMust && !value && typeof value !== 'number') {
      return '此项是必填项';
    }

    if (
      typeof max === 'number' &&
      typeof value === 'string' &&
      value.length > max
    ) {
      return `长度不能超过 ${max}`;
    }

    if (isEmail) {
      const result = EmailValidator.validate(value);
      if (!result) {
        return '邮箱格式错误';
      }
    }

    return '';
  };

  handleChange = (index: number, value: string) => {
    const { values } = this.state;
    const newValues = [...values];
    newValues.splice(index, 1, value);
    this.setState({ values: newValues });

    this.validFieldValue(index, value);
  };

  validFieldValue = (index: number, value: string) => {
    const { errors } = this.state;

    const { fields } = this.props;
    const field = fields[index];
    const { isMust, max } = field;

    const rules: { isMust: boolean; max?: number; isEmail?: boolean } = {
      isMust,
    };

    if (NEED_VALID_MAX_CONTROLS.includes(field.type.value)) {
      rules.max = max;
    }
    if (field.type.value === TypeValue.Email) {
      rules.isEmail = true;
    }

    const error = this.getFieldValueError(rules, value);

    const newErrors = [...errors];
    newErrors.splice(index, 1, error);
    this.setState({ errors: newErrors });
  };

  handleSave = () => {
    const { values } = this.state;
    values.forEach((value, index) => {
      setTimeout(() => {
        this.validFieldValue(index, value);
      });
    });
    setTimeout(() => {
      const { onSave, fields } = this.props;
      if (onSave) {
        if (this.state.errors.every(error => !error)) {
          const valuesParam: Values = {};
          fields.forEach((field, index) => {
            valuesParam[field.id] = values[index];
          });
          onSave(valuesParam);
        } else {
          message.error('表单信息填写有误');
        }
      }
    });
  };

  handleSelectImage = (file: Blob, index: number) => {
    const { onSelectImage } = this.props;
    onSelectImage &&
      onSelectImage(file, (url: string) => this.handleChange(index, url));
  };

  render() {
    const { fields } = this.props;
    const { values, errors } = this.state;
    return (
      <div className="form-input">
        <HeaderFooterFixedLayout
          header={null}
          content={fields.map((field, index) => (
            <ControlWrapper
              field={field}
              key={`${field.id}`}
              onChange={value => this.handleChange(index, value)}
              value={values[index]}
              error={errors[index]}
              onSelectImage={(file: Blob) =>
                this.handleSelectImage(file, index)
              }
            />
          ))}
          footer={
            <div className="form-input__save-btn-wrapper">
              <Button type="primary" block onClick={this.handleSave}>
                保存
              </Button>
            </div>
          }
        ></HeaderFooterFixedLayout>
      </div>
    );
  }
}
