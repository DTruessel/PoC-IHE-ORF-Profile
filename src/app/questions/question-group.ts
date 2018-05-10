import { QuestionBase } from './question-base';

export class QuestionGroup extends QuestionBase<any> {

    controlType = 'group';
    children: QuestionBase<any>[] = [];
    nestingLevel: number;

    constructor(initArgs: {} = {}) {
        super(initArgs);
        this.value = 0; // dummy for group
    }
}
