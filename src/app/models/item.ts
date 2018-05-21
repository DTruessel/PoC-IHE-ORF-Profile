
export class
    Item {

    linkId: string;
    text: string;
    type: 'group' | 'string' | 'date' | 'choice' | 'text' | 'boolean' | 'display' | 'question' | 'definition' | 'valueCoding'; // weitere eingefügt
    definition: string;
    code: string;
    system: string;
    display: string;
    options?: string[];
    items?: Item[];

    constructor() { }
}

