/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormField {
  label: string;
  name: string;
  type: string;
  id: string;
  validators?: any[];
  asyncValidators?: any[];
}

export interface Options{
  value: any;
  label: string;
}