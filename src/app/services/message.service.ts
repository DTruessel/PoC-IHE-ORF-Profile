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
