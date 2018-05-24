import { Item } from './item';

export class Questionnaire {

    id: any;  // string geändert in any 18.05.2018: in https://www.hl7.org/fhir/questionnaire.html nicht aufgeführt
    url: string;
    identifier: string;             //token
    version: string;                //token
    name: string;
    title: string;
    status: string;                 //draft | active | retired | unknown
    experimental: boolean;
    date: Date;
    publisher: string
    description: string;
    purpose: string;
    approvalDate: Date;
    lastReviewDate: Date;
    effectivePeriod: Date;
    useContext: any;
    jurisdiction: Element;          //token
    contact: Element;
    copyright: string;
    code: string;                   //token
    subjectType: string[];
    effective: Date;
    items: Item[];

    ;









}

