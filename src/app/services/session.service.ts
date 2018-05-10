import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

  public selectedQuestionnaire;

  selectRow(row) {
    alert('selected: ' + JSON.stringify(row.resource));
    console.log(JSON.stringify(row.resource));
    return (JSON.stringify(row.resource));
  }

}
