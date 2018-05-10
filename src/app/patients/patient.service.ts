import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Patient } from './patient';
import { PATIENTS } from './mock-patients';

import { MessageService } from '../message.service';


@Injectable()

export class PatientService {

  constructor(private messageService: MessageService) { }

  getPatients(): Observable<Patient[]> {
    // TODO: send the message _after_ fetching the patients
    this.messageService.add('PatientService: fetched patients');
    return of(PATIENTS);
  }


  getPatient(id: number): Observable<Patient> {
    // TODO: send the message _after_ fetching the patient
    this.messageService.add(`PatientService: fetched patient id=${id}`);
    return of(PATIENTS.find(patient => patient.id === id));
  }
}



