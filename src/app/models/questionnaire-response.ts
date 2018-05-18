import { Item } from "./item";

export class QuestionnaireResponse {
    id: any;                                                // string geändert in any 18.05.2018
    identifier: string;
    questionnaire: string;
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