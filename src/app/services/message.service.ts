import { Injectable } from '@angular/core';

@Injectable()

export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

//Das FHIR Bundle wurde erfolgreich verschickt
//Der Empfänger konnte das Bundle nicht empfangen

//alert('No Questionnaire found in Session');

  /**private messageToUser() {
    //HTTP 200 (OK) Questionnaire Resource is returned
    //HTTP 200 (OK) Resource Bundle mit 0 Resultaten is returned
    //HTTP 406 (Not Acceptable) Server kann im verlangen Format _format keine Antwort schicken
    //HTTP 200 (OK) Questionnaire mit gesuchter resourceID gesendet
    //HTTP 404 (Not Found) OperationsOutcome: Resource nicht gefunden

      if (response.status = 200) {
        alert('Bundle created ' + ' HTTP ' + response.status + response.headers + ' (OK)')

      else if (response.status = 400) {
        alert('Server kann im verlangen Format _format keine Antwort schicken' + ' HTTP ' + response.status + ' (Bad Request)')
      }
      else if (response.status = 404) {
        alert('OperationsOutcome: Resource nicht gefunden' + ' HTTP ' + response.status + ' (Not Found)')
      }
      else if (response.status = 406) {
        alert('Server kann im verlangen Format _format keine Antwort schicken' + ' HTTP ' + response.status + ' (Not Acceptable)')
      }
      else alert(' HTTP ' + response.status)






  */
