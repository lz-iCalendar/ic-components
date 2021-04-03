import React from 'react';
import { Field } from './FormInput';
import Label from './Label';
import Control from './Control';

export interface ControlWrapperProps {
  field: Field;
  onChange: (value: string) => void;
  value: string;
  error: string;
}

const prefix = 'form-input-control-wrapper';
const ControlWrapper: React.FunctionComponent<ControlWrapperProps> = ({
  field,
  onChange,
  value,
  error,
}) => {
  const { id, name, type, isMust } = field;
  return (
    <div className={prefix}>
      <Label label={name} htmlFor={`${prefix}-${id}`} isMust={isMust} />
      <div className={`${prefix}__control-wrapper`}>
        <Control id={id} type={type.value} value={value} onChange={onChange} />
      </div>
      {error && <div className={`${prefix}__error`}>{error}</div>}
    </div>
  );
};

export default ControlWrapper;
