import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {

  controlType = 'textbox';
  type: string;

  constructor(initArgs: {} = {}) {
    super(initArgs);
    this.type = initArgs['type'] || '';
  }
}

