import React from 'react';
import { Field } from './FormInput';
import Label from './Label';
import Control from './Control';
import {
  UploadRequestOption,
  BeforeUploadFileType,
  RcFile,
} from 'rc-upload/lib/interface';

export interface ControlWrapperProps {
  field: Field;
  onChange: (value: string) => void;
  value: string;
  error: string;
  onSelectImage?: (
    file: Exclude<BeforeUploadFileType, File | boolean> | RcFile
  ) => void;
}

const prefix = 'form-input-control-wrapper';
const ControlWrapper: React.FunctionComponent<ControlWrapperProps> = ({
  field,
  onChange,
  value,
  error,
  onSelectImage,
}) => {
  const { id, name, type, isMust } = field;
  return (
    <div className={prefix}>
      <Label label={name} htmlFor={`${prefix}-${id}`} isMust={isMust} />
      <div className={`${prefix}__control-wrapper`}>
        <Control
          id={id}
          type={type.value}
          value={value}
          onChange={onChange}
          options={type.options}
          onSelectImage={onSelectImage}
        />
      </div>
      {error && <div className={`${prefix}__error`}>{error}</div>}
    </div>
  );
};

export default ControlWrapper;
