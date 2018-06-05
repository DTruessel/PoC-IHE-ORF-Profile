import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';

const patientsRoutes: Routes = [
    { path: 'patients-list', component: PatientsListComponent },
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
