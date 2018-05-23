/// <reference path="../../../../node_modules/@types/fhir/index.d.ts" />

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { AppRoutingModule } from '../../shared/app-routing.module';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})

export class PatientsListComponent implements OnInit {

  searched = false;
  bundle: fhir.Bundle;
  dataSource = new MatTableDataSource<fhir.BundleEntry>();

  length = 100;
  pageSize = 10;
  oldPageIndex = 0;
  pageSizeOptions = [this.pageSize];

  @ViewChild('filter')
  private filterInput: ElementRef;

  private data$: BehaviorSubject<fhir.Bundle>;

  constructor
    (
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
  ) {

    this.data$ = new BehaviorSubject(null);
    this.search(this.makeQuery(null));

    fhirHttpService.search({ type: 'Patient', query: { _count: this.pageSize } }).then(response => {
      this.bundle = <fhir.Bundle>response.data;
      this.dataSource.data = this.bundle.entry;
      this.length = this.bundle.total;
      console.log('called ');
    });
  }

  /**
  * Bundles have their 'page back' link called 'previous'
  * fhir.js in node_modules calls it 'prev'.
  * As a simple fix patch bundle...
  */
  patchPrevBug(bundleData) {
    if (bundleData && bundleData.link) {
      bundleData.link.forEach(link => {
        if (link.relation === 'previous') {
          link.relation = 'prev';
        }
      });
    }
  }

  private makeQuery(q: Object) {
    const base = { type: 'Patient', query: { _count: this.pageSize } };
    if (q) {
      return Object.assign({}, base, { query: Object.assign(base.query, q) });
    }
    return base;
  }
  /**
   * When sending data to a web server, the data has to be a string.
   * Convert a JavaScript object into a string with JSON.stringify()
   */
  private search(query) {
    console.log('** before fhirHttpService.search, query: ' + JSON.stringify(query));
    this.fhirHttpService.search(query).then(response => {
      this.data$.next(<fhir.Bundle>response.data);
      console.log('** after fhirHttpService.search, hits: ' + this.length);
    });
  }

  ngOnInit() {
    this.data$.subscribe((patientsBundle: fhir.Bundle) => {
      if (patientsBundle) {
        this.bundle = patientsBundle;
        this.dataSource.data = patientsBundle.entry;
        this.length = patientsBundle.total;
        for (const p of patientsBundle.entry) {
          console.log(p);
        }
      }
    });
    // event listener für den Filter
    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(() => {
        const searchString = this.filterInput.nativeElement.value;
        this.search(this.makeQuery({ family: searchString }));
      });
  }

  selectRow(row) {
    this.sessionService.selectedQuestionnaire = row.resource;
    alert('selected: ' + JSON.stringify(row.resource));
    console.log(this.sessionService.selectedQuestionnaire);
    // this.router.navigate(['/questionnaire-form']);
  }

  getPatientFamilyName(entry: fhir.BundleEntry): string {
    const patient = (<fhir.Patient>entry.resource);
    if (patient.name && patient.name.length > 0 && patient.name[0].family) {
      return patient.name[0].family;
    }
    return '';
  }

  getPatientGivenNames(entry: fhir.BundleEntry): string {
    const patient = (<fhir.Patient>entry.resource);
    if (patient.name && patient.name.length > 0 && patient.name[0].given) {
      return (<fhir.Patient>entry.resource).name[0].given.join(' ');
    }
    return '';
  }

  getPatientBirthDate(entry: fhir.BundleEntry): string {
    const patient = (<fhir.Patient>entry.resource);
    if (patient.birthDate) {
      return patient.birthDate;
    }
    return '';
  }

  getPatientAddressLines(entry: fhir.BundleEntry): string {
    const patient = (<fhir.Patient>entry.resource);
    if (patient.address && patient.address.length > 0 && patient.address[0].line) {
      return patient.address[0].line.join(', ');
    }
    return '';
  }

  getPatientAddressCity(entry: fhir.BundleEntry): string {
    const patient = (<fhir.Patient>entry.resource);
    if (patient.address && patient.address.length > 0 && patient.address[0].city) {
      return patient.address[0].city;
    }
    return '';
  }

  //goToPage kontrolliert 21.05.2018; patchPrevBug eingefügt

  goToPage(event: PageEvent) {
    if (event.pageIndex > this.oldPageIndex) {
      this.fhirHttpService.nextPage({ bundle: this.bundle }).then(response => {
        this.oldPageIndex = event.pageIndex;
        this.bundle = <fhir.Bundle>response.data;
        this.length = this.bundle.total;
        this.dataSource.data = this.bundle.entry;
        console.log('next page called ');
      });
    } else {
      this.patchPrevBug(this.bundle);
      this.fhirHttpService.prevPage({ bundle: this.bundle }).then(response => {
        //this.fhirHttpService.prevPage({ bundle: this.bundle }).then(response => { //korrigiert 20.05.2018
        this.oldPageIndex = event.pageIndex;
        this.bundle = <fhir.Bundle>response.data;
        this.length = this.bundle.total;
        this.dataSource.data = this.bundle.entry;
        console.log('previous page called ');
      });
    }
  }
}
