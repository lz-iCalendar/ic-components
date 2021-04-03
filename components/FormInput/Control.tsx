import React from 'react';
import { Input, InputNumber, DatePicker, Radio, Select } from 'antd';
import { Option, TypeValue } from '../FieldsBoard/type';
import classNames from 'classnames';
import moment from 'moment';

export interface ControlProps {
  id: string;
  type: TypeValue;
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
}

const prefix = 'form-input-control';

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

  const handleDatePickerChange = (value: any, dateString: string) => {
    onChange(dateString);
  };

  switch (type) {
    case TypeValue.SingleLineText: {
      return (
        <Input value={value} onChange={handleInputChange} className={prefix} />
      );
    }
    case TypeValue.ParagraphText: {
      return (
        <Input.TextArea
          onChange={handleInputChange}
          value={value}
          className={classNames(prefix, `${prefix}__textarea`)}
          cols={1}
        />
      );
    }
    case TypeValue.Number: {
      return (
        <InputNumber
          value={value}
          onChange={handleNumberChange}
          className={prefix}
        />
      );
    }
    case TypeValue.Date: {
      return (
        <DatePicker
          className={prefix}
          value={value ? moment(value) : undefined}
          onChange={handleDatePickerChange}
        />
      );
    }
    case TypeValue.Time: {
      return (
        <DatePicker
          className={prefix}
          value={value ? moment(value) : undefined}
          onChange={handleDatePickerChange}
        />
      );
    }
    case TypeValue.SingleChoice: {
      if (Array.isArray(options)) {
        return (
          <Radio.Group
            onChange={handleRadioChange}
            value={value}
            className={prefix}
          >
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
          <Select
            mode="multiple"
            onChange={handleSelectChange}
            value={value}
            className={prefix}
          >
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

    default: {
      return null;
    }
  }
};

export default Control;
