import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../services/message.service';
import { Patient } from '../models/patient';
import { PATIENTS } from '../patients/mock-patients';

@Injectable()

export class PatientService {

  selectedPatient: Patient;

  constructor(private messageService: MessageService) { }

  getPatients(): Observable<Patient[]> {
    // TODO: send the message _after_ fetching the patients
    this.messageService.add('PatientService: fetched patients');
    return of(PATIENTS);
  }

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
    console.log(this.selectedPatient.lastname)
  }


  /*getPatientFamilyName(entry: fhir.BundleEntry): string {
    const patient = (<fhir.Patient>entry.resource);
    if (patient.name && patient.name.length > 0 && patient.name[0].family) {
      return patient.name[0].family;
    }
    return '';
  }*/

  /*getPatient(id: number): Observable<Patient> {
    // TODO: send the message _after_ fetching the patient
    this.messageService.add(`PatientService: fetched patient id=${id}`);
    return of(PATIENTS.find(patient => patient.id === id));
  }*/
}

/*const read: ReadObj = { id: '46912', type: 'Patient' };

this.fhirHttpService.read(read).then(response => {
  expect(response.status).toBe(200);
  expect(response.data.id).toBe('46912');
  expect(response.data.meta.id.versionId).toBe('1');
});*/



