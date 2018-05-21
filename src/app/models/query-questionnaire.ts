import { Item } from "./item";

export class QueryQuestionnaire {

    _language: string;
    date: Date;
    identifier: string;
    code: string;
    jurisdiction: string;
    description: string;
    title: string;
    version: any;
    url: string;
    effective: Date;
    name: string;
    publisher: string;
    _id: any;                           // string geändert in any 18.05.2018                        
    status: string;
    questionnaire: string;
    text: string;
    experimental: boolean;
    subjectType: string;
    items: Item[];

}