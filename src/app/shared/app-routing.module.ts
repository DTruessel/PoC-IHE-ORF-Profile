import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Questionnaire01Component } from '../questionnaire01/questionnaire01.component';
import { CapabilityStatementComponent } from '../capability-statement/capability-statement.component';
import { PatientsComponent } from '../patients/patients.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

import { SettingsComponent } from '../settings/settings.component';
import { FormComponent } from '../form/form.component';
import { UserComponent } from '../user/user.component';

const routes: Routes = [
    {
      path: '', component: HomeComponent
    },
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'patients', component: PatientsComponent
    },
    {
      path: 'user', component: UserComponent
    },
    {
      path: 'form', component: FormComponent
    },
    {
      path: 'questionnaire01', component: Questionnaire01Component
    },
    {
      path: 'CapabilityStatement', component: CapabilityStatementComponent
    },
    {
      path: 'settings', component: SettingsComponent
    },
    {
      path: '', component: LoginComponent
    }
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

/*http://www.devglan.com/angular/angular-material-app*/
