import { Item } from "./item";

export class QuestionnaireResponse {

    identifier: string;                     //token    
    basedOn: string;                       //reference    
    parent: string;                         //reference    
    questionnaire: string;                  //reference
    status: string;                         //token
    context: string;                        //reference
    authored: Date;                          //date
    author: string;                         //reference
    source: string;                         //reference
    items: Item[];
}