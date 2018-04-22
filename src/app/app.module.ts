import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SettingsComponent } from './settings/settings.component';
import { FormComponent } from './form/form.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { UserService } from './shared/user.service';
import { HttpService } from './shared/http.service';
import { HttpConfigComponent } from './http-config/http-config.component';
import { MessagesComponent } from './messages/messages.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { AuthService } from './shared/auth.service';
import { UserComponent } from './user/user.component';

import { UserGetService } from './shared/user-get.service';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    CapabilityStatementComponent,
    PatientsComponent,
    HomeComponent,
    LoginComponent,
    FormComponent,
    Questionnaire01Component,
    HttpConfigComponent,
    MessagesComponent,
    DownloaderComponent,
    UserComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgFhirjsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
  ],

  providers: [
    { provide: FHIR_HTTP_CONFIG, useValue: FHIR_JS_CONFIG },
    UserService,
    AppRoutingModule,
    HttpService,
    AuthService,

    UserGetService
  ],

  bootstrap: [ AppComponent ]

})

export class AppModule { }
