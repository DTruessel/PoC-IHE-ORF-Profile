/// <reference path="../../../node_modules/@types/fhir/index.d.ts" />

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { AppRoutingModule } from '../shared/app-routing.module';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {

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

  constructor(private fhirHttpService: FhirJsHttpService) {
    this.data$ = new BehaviorSubject(null);
    this.search(this.makeQuery(null));

    /*fhirHttpService.search({ type: 'Patient', query: { _count: this.pageSize } }).then(response => {
      this.bundle = <fhir.Bundle>response.data;
      this.dataSource.data = this.bundle.entry;
      this.length = this.bundle.total;
      console.log('called ');
    });*/

  }

  private makeQuery(q: Object) {
    const base = { type: 'Questionnaire', query: { _count: this.pageSize } };
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
    this.data$.subscribe((questionnairesBundle: fhir.Bundle) => {
      if (questionnairesBundle) {
        this.bundle = questionnairesBundle;
        this.dataSource.data = questionnairesBundle.entry;
        this.length = questionnairesBundle.total;
        for (const p of questionnairesBundle.entry) {
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
        this.search(this.makeQuery({ title: searchString }));
      });
  }

  selectRow(row) {
    alert('selected: ' + JSON.stringify(row.resource));
  }

  getQName(entry: fhir.BundleEntry) {
    const quest = (<fhir.Questionnaire>entry.resource);
    if (quest) {
      const line = quest.resourceType + ': ' + quest.title + ' | ' + quest.id;
      console.log(line);
      return line;
    }
    return '-';
  }


}
