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

  selectedPatient: Patient;

  patients: Patient[];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(patients => this.patients = patients);
  }

}
