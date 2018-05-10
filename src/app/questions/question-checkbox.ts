import { QuestionBase } from './question-base';

export class CheckboxQuestion extends QuestionBase<boolean> {

  controlType = 'checkbox';
  options: { key: string, value: string }[] = [];

  constructor(initArgs: {} = {}) {
    super(initArgs);
    this.options = initArgs['options'] || [];
  }
}
