import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {

  controlType = 'textbox';
  type: string; // is propagated as <input type="..."! TODO make own Question for each usable one!!

  constructor(initArgs: {} = {}) {
    super(initArgs);
    this.type = initArgs['type'] || '';
  }
}

