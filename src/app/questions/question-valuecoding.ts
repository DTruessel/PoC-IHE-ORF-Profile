import { QuestionBase } from './question-base';

export class ValueCodingQuestion extends QuestionBase<string> {

    controlType = 'valueCoding';
    options: { key: string, value: string }[] = [];

    constructor(initArgs: {} = {}) {
        super(initArgs);
        this.options = initArgs['options'] || [];
    }
}