import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Patient } from './patient';
import { PATIENTS } from './mock-patients';
import { MessageService } from '../message.service';
import { of } from 'rxjs/observable/of';

@Injectable()

export class PatientService {

  constructor(private messageService: MessageService) { }

  getPatients(): Observable<Patient[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('PatientService: fetched patients');
    return of(PATIENTS);
  }

  getPatient(id: number): Observable<Patient> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`PatientService: fetched patient id=${id}`);
    return of(PATIENTS.find(patient => patient.id === id));
  }
}



