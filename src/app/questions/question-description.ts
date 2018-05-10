import { QuestionBase } from './question-base';

export class QuestionDescription extends QuestionBase<string> {

    controlType = 'description';

    constructor(initArgs: {} = {}) {
        super(initArgs);
    }
}
