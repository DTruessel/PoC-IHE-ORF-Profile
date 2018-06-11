import { Item } from "./item";

export class QuestionnaireResponse {

    identifier: string;                     //token    
    basedOn: string;                       //reference    
    parent: string;                         //reference    
    questionnaire                          //reference
    status: string;                         //in-progress | completed | amended | entered-in-error | stopped
    subject: string;                        //reference
    context: string;                        //reference
    authored: Date;                          //date
    author: string;                         //reference
    source: string;                         //reference
    item: Item[];//item nennen, damit Iresource Items erkennt
    resourceType = 'QuestionnaireResponse';

}