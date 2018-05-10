import { QuestionBase } from './question-base';

export class TextareaQuestion extends QuestionBase<string> {

  controlType = 'textarea';
  rows = 3;
  span = 1;

  constructor(initArgs: {} = {}) {
    super(initArgs);
    this.rows = initArgs['rows'];
    this.span = initArgs['span'];
  }
}

