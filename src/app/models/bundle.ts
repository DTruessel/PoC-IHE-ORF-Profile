export class Item {
    identifier: any;
    type; //code; document | message | transaction | transaction-response | batch | batch-response | history | searchset | collection
    total: number;
    link: string;
    entry;

    constructor() {
    }
}