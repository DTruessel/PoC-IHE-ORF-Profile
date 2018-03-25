import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';

import { NgFhirjsModule } from 'ng-fhirjs';
import { FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { FHIR_JS_CONFIG } from './settings/settings.component.spec';
import { Questionnaire01Component } from './questionnaire01/questionnaire01.component';
import { CapabilityStatementComponent } from './capability-statement/capability-statement.component';
import { PatientsComponent } from './patients/patients.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { FormComponent } from './form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './shared-services/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    CapabilityStatementComponent,
    PatientsComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    FormComponent,
    Questionnaire01Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgFhirjsModule,
    AppRoutingModule

  ],
  providers: [ { provide: FHIR_HTTP_CONFIG, useValue: FHIR_JS_CONFIG} ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
