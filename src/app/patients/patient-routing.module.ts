import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const patientsRoutes: Routes = [
    { path: 'patients-list', component: PatientsListComponent },
    { path: 'patient/:id', component: PatientDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(patientsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PatientRoutingModule { }
