import { QuestionBase } from './question-base';

export class QuestionDefinition extends QuestionBase<string> {

    controlType = 'definition';

    constructor(initArgs: {} = {}) {
        super(initArgs);
    }
}