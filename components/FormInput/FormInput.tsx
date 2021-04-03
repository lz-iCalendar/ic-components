import React from 'react';
import classNames from 'classnames';
import { Option, TypeValue } from '../FieldsBoard/type';
import { Input, InputNumber, DatePicker, Radio, Select } from 'antd';

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

export interface FormInputProps {
  fields: Field[];
}

export interface LabelProps {
  label: string;
  htmlFor: string;
}

const Label: React.FunctionComponent<LabelProps> = ({ label, htmlFor }) => {
  return <label htmlFor={htmlFor}>{label}</label>;
};

export interface ControlProps {
  id: string;
  type: TypeValue;
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
}

const Control: React.FunctionComponent<ControlProps> = ({
  id,
  type,
  value,
  onChange,
  options,
}) => {
  const handleInputChange = e => {
    onChange(e.target.value);
  };

  const handleNumberChange = (value: string) => {
    onChange(value);
  };

  const handleRadioChange = e => {
    onChange(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    onChange(value);
  };

  switch (type) {
    case TypeValue.SingleLineText: {
      return <Input value={value} onChange={handleInputChange} />;
    }
    case TypeValue.ParagraphText: {
      return <Input.TextArea onChange={handleInputChange} />;
    }
    case TypeValue.Number: {
      return <InputNumber value={value} onChange={handleNumberChange} />;
    }
    case TypeValue.Date: {
      return <DatePicker />;
    }
    case TypeValue.Time: {
      return <DatePicker />;
    }
    case TypeValue.SingleChoice: {
      if (Array.isArray(options)) {
        return (
          <Radio.Group onChange={handleRadioChange} value={value}>
            {options.map(option => (
              <Radio value={option.value}>{option.label}</Radio>
            ))}
          </Radio.Group>
        );
      }
      return null;
    }
    case TypeValue.MultipleChoice: {
      if (Array.isArray(options)) {
        return (
          <Select mode="multiple" onChange={handleSelectChange} value={value}>
            {options.map(option => (
              <Select.Option value={option.value}>{option.label}</Select.Option>
            ))}
          </Select>
        );
      }
      return null;
    }

    case TypeValue.Image: {
      return null;
    }

    case TypeValue.Email: {
      return null;
    }

    case TypeValue.Region: {
      return null;
    }

    case TypeValue.Location: {
      return null;
    }
  }
};

export interface ControlWrapperProps {
  field: Field;
  onChange: (value: string) => void;
  value: string;
}

const prefix = 'form-input';
const ControlWrapper: React.FunctionComponent<ControlWrapperProps> = ({
  field,
  onChange,
  value,
}) => {
  const { id, name, type } = field;
  return (
    <div>
      <Label label={name} htmlFor={`${prefix}-${id}`} />
      <div className="form-input__control-wrapper">
        <Control id={id} type={type.value} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export interface FormInputState {
  values: string[];
}

export default class FormInput extends React.Component<
  FormInputProps,
  FormInputState
> {
  constructor(props: FormInputProps) {
    super(props);
    const values = props.fields.map(field => field.value);
    this.state = {
      values,
    };
  }

  handleChange = (index: number, value: string) => {
    const { values } = this.state;
    const newValues = [...values];
    newValues.splice(index, 1, value);
    this.setState({ values: newValues });
  };

  render() {
    const { fields } = this.props;
    const { values } = this.state;
    return (
      <div className="form-input">
        {fields.map((field, index) => (
          <ControlWrapper
            field={field}
            key={field.id}
            onChange={value => this.handleChange(index, value)}
            value={values[index]}
          />
        ))}
      </div>
    );
  }
}
