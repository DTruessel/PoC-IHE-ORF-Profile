export class QuestionBase<T> {

  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(
    initArgs: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string
    } = {}) {
    this.value = initArgs.value;
    this.key = initArgs.key || '';
    this.label = initArgs.label || '';
    this.required = !!initArgs.required;
    this.order = initArgs.order === undefined ? 1 : initArgs.order;
    this.controlType = initArgs.controlType || '';
  }
}
