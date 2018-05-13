import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  public selectedQuestionnaire: any;

  constructor() { }

  getSelectedQuestionnaire() {
    return this.selectedQuestionnaire;
  }

  setSelectedQuestionnaire(data: any[]) {
    this.selectedQuestionnaire = data;
  }

}
