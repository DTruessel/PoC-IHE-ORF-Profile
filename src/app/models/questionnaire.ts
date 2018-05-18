import { Item } from './item';

export class Questionnaire {
    id: any;                                                 // string geändert in any 18.05.2018
    text: string;
    url: string;
    title: string;
    status: string;
    experimental: boolean;
    date: Date;
    publisher: string;
    subjectType: string;
    items: Item[];
}

