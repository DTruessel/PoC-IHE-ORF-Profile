import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<Date> {

  controlType = 'date';
  type: string = 'date';

  constructor(initArgs: {} = {}) {
    super(initArgs);
  }
}
