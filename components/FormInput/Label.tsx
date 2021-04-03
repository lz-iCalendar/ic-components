import React from 'react';

export interface LabelProps {
  label: string;
  htmlFor: string;
  isMust?: boolean;
}

const prefix = 'form-input-label';
const Label: React.FunctionComponent<LabelProps> = ({
  label,
  htmlFor,
  isMust,
}) => {
  return (
    <label htmlFor={htmlFor} className={prefix}>
      {isMust && <span className={`${prefix}__must`}>*</span>}
      {label}
    </label>
  );
};

export default Label;
