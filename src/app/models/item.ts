
export class
    Item {

    linkId: string;
    text: string;
    type: 'group' | 'string' | 'date' | 'choice' | 'text' | 'boolean';
    definition: string;
    code: string;
    system: string;
    display: string;
    options?: string[];
    items?: Item[];

    /*valueCoding? */

    constructor() { }
}

