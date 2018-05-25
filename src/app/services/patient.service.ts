import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../services/message.service';
import { Patient } from '../models/patient';
import { PATIENTS } from '../patients/mock-patients';

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



