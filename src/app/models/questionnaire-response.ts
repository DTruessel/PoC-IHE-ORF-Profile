import { Item } from "./item";

export class QuestionnaireResponse {

    identifier: string;                     //token    
    basedOn: string;                       //reference    
    parent: string;                         //reference    
    questionnaire: string;                  //reference
    status: string;                         //token
    subject: string;                        //reference
    context: string;                        //reference
    authored: Date;                          //date
    author: string;                         //reference
    source: string;                         //reference
    //item: items
    items: Item[];
    //item.linkId: string;
    //item.definition: string;
    //item.text: string;
    //item.subject: any;
    //item.answer;
    //item.answer.value[x]
    //item.answer.item
    //item.item

    patient: string;                        //reference
    id: number;
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
    experimental: boolean;
    subjectType: string;

}

/*	If a QuestionnaireResponse references a Questionnaire, then the QuestionnaireResponse structure
must be consistent with the Questionnaire (i.e. questions must be organized into the same groups,
nested questions must still be nested, etc.).*/