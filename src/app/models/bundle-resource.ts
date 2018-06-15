
export class BundleResource {
    identifier: any;
    type = 'document'; //code; document | message | transaction | transaction-response | batch | batch-response | history | searchset | collection
    total: number;
    link: string;
    entry: IResource[];
    id?: string;
    meta?= new Date();
    text?: any;
    [others: string]: any;
    resourceType = 'Bundle';

    constructor() { }
}