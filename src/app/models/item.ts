import { Answer } from "./answer";


export class Item {

    // ItemQuestionnaire
    linkId: string;             // https://www.hl7.org/fhir/questionnaire.html#def
    definition: string;
    code: any;
    prefix: string;
    text: string;
    type:                       // https://www.hl7.org/fhir/valueset-item-type.html
    'group' |
    'string' |
    'choice' |
    'text' |
    'display' |
    'boolean' |
    'decimal' |
    'integer' |
    'date' |
    'dateTime+' |
    'valueCoding';
    enableWhen: string;
    required: boolean;
    repeats: boolean;
    readOnly: boolean;
    maxLength: string;              // sollte integer sein
    option: string;                 // value[x] valueInteger, valueDate, valueTime, valueString, valueCoding
    initial: string;                // integer|date|time|string|Coding
    initialBoolean: boolean;
    initialDecimal: string;         //sollte decimal sein
    initialInteger: string;         // sollte integer sein
    initialDate: string;            // sollte date sein
    initialDateTime: string;        // sollte dateTime sein
    time: string;                   // sollte time sein
    initialString: string;
    initialUri: string;                    //sollte uri sein          
    initialAttachment: string;      //sollte Attachment sein
    initialCoding: string;          //sollte Coding sein
    initialQuantity: string;        // sollte Quantity sein   
    system: string;
    display: string;
    subject: string;
    initialReference: string;       //sollte Reference(Any) sein                 
    items: Item[];
    options?: string[];
    answer:
    'boolean' |
    'decimal' |
    'integer' |
    'date' |
    'dateTime' |
    'time' |
    'string' |
    'uri' |
    'Attachment' |
    'Coding' |
    'Quantity' |
    'Reference(Any)'
    ;


    constructor() { }
}



/*	If a QuestionnaireResponse references a Questionnaire, then the QuestionnaireResponse structure
must be consistent with the Questionnaire (i.e. questions must be organized into the same groups,
nested questions must still be nested, etc.).*/
