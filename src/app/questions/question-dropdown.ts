import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {

  controlType = 'dropdown';
  options: { key: string, value: string }[] = [];

  constructor(initArgs: {} = {}) {
    super(initArgs);
    this.options = initArgs['options'] || [];
  }
}
