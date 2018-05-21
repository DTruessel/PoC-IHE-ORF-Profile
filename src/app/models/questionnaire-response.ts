import { Item } from "./item";

export class QuestionnaireResponse {

    author: string;                         //reference
    authored: Date;                          //date
    //based-on: string;                       //reference
    context: string;                        //reference
    identifier: string;                     //token
    parent: string;                         //reference
    patient: string;                        //reference
    questionnaire: string;                  //reference
    source: string;                         //reference
    status: string;                         //token
    subject: string;                        //reference

    _language: string;
    date: Date;
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


    text: string;
    experimental: boolean;
    subjectType: string;
    items: Item[];
}