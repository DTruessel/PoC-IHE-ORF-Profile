import { Item } from './item';

export class Questionnaire {

    url: string;
    identifier: string;             //token
    version: string;                //token
    name: string;
    title: string;
    status: string;
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
    subjectType: string;

    effective: Date;
    items: Item[];
    linkId: string;                 //item.linkId
    definition: string;             //item.definition
    //item.code: string;
    //item.prefix
    //item.text
    //item.type
    //item.enableWhen
    //item.enableWhen.question
    //item.enableWhen.hasAnswer
    //item.enableWhen.answer[x]
    //item.required
    //item.repeats
    //item.readOnly
    //item.maxLength
    //item.options
    //item.option
    //item.option.value[x]
    //item.initial[x]
    //item.item
    ;




    id: any;  // string geändert in any 18.05.2018: in https://www.hl7.org/fhir/questionnaire.html nicht aufgeführt




}

