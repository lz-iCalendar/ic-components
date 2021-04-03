import React from 'react';

export interface FormInputContentValues {
  values: string[];
  errors: string[];
  onChange: (index: number, value: string) => void;
}

const defalultValeus: FormInputContentValues = {
  values: [],
  errors: [],
  onChange: () => {},
};

export const FormInputContext = React.createContext<FormInputContentValues>(
  defalultValeus
);
