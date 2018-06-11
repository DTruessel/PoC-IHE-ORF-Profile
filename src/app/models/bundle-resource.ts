export class BundleResource {
    identifier: any;
    type = 'transaction'; //code; document | message | transaction | transaction-response | batch | batch-response | history | searchset | collection
    total: number;
    link: string;
    entry: Entry;
    id?: string;
    'resourceType': 'Bundle';
    meta?= new Date();
    text?: any;
    [others: string]: any;
    resource: any;

    constructor() { }
}