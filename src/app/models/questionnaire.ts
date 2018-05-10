import { Item } from './item';

export class Questionnaire {
    id: string;
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

