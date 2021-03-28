export enum TypeValue {
  SingleLineText,
  ParagraphText,
  Number,
  Date,
  Time,
  SingleChoice,
  MultipleChoice,
  Image,
  Email,
  Region,
  Location,
}

export interface Option {
  label: string;
  value: string;
}
export interface FieldBaseAttributeType {
  value: TypeValue;
  options?: Option[];
}

export interface FieldBaseAttribute {
  id: string;
  type: FieldBaseAttributeType;
  name: string;
  desc: string;
  defaultValue: string;
  isMust: boolean;
  max: number;
}
