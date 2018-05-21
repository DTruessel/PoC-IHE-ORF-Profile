import { Item } from './item';

export class Questionnaire {

    code: string;                                   //token
    date: Date;
    description: string;
    effective: Date;
    identifier: string;                            //token
    jurisdiction: string;                          //token
    name: string;
    publisher: string;
    status: string;
    title: string;
    url: string;
    version: string;                               //token
    id: any;                                      // string geändert in any 18.05.2018
    text: string;
    experimental: boolean;
    subjectType: string;
    items: Item[];
}

