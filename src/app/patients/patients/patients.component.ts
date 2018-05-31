import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Patient[];
  messages: string[] = [];
  entry: fhir.BundleEntry;

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(patients => this.patients = patients);
  }

  /*getPatientFamilyName(): void {
    this.patientService.getPatientFamilyName(this.entry)
      .subscribe(patients => this.patients = patients);

  }*/

  add(message: string) {
    this.messages.push(message);
  }

}
