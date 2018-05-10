import { QuestionBase } from './question-base';

export class RadioButtonQuestion extends QuestionBase<string> {

  controlType = 'radio-button';
  options: { key: string, value: string }[] = [];

  constructor(initArgs: {} = {}) {
    super(initArgs);
    this.options = initArgs['options'] || [];
  }
}
