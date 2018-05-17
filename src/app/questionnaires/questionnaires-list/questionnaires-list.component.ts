/// <reference path="../../../../node_modules/@types/fhir/index.d.ts" />

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { AppRoutingModule } from '../../shared/app-routing.module';
import { Questionnaire } from '../../models/questionnaire';
import { Item } from '../../models/item';
import { SessionService } from '../../services/session.service';
import { ParserService } from '../../services/parser.service';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.css'],
})

export class QuestionnairesListComponent implements OnInit {

  selectedRowIndex: any;
  row: any;

  dataSource = new MatTableDataSource<fhir.BundleEntry>();

  length = 100;
  pageSize = 10;
  oldPageIndex = 0;
  pageSizeOptions = [this.pageSize];
  searchString: any;

  @ViewChild('id')
  private elId: ElementRef;

  @ViewChild('code')
  private elCode: ElementRef;

  @ViewChild('identifier')
  private elIdentifier: ElementRef;

  @ViewChild('publisher')
  private elPublisher: ElementRef;

  @ViewChild('status')
  private elStatus: ElementRef;

  @ViewChild('title')
  private elTitle: ElementRef;

  @ViewChild('version')
  private elVersion: ElementRef;

  private data$: BehaviorSubject<fhir.Bundle>;            // data$ ist ein observable

  constructor(
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private router: Router,
  ) {

    this.data$ = new BehaviorSubject(null);               // data$ gibt die Daten aus, die vom Backend empfangen worden sind.
    // this.search(this.makeQuery({ title: 'ebida' }));   // {} ist immer ein objekt

  }

  private makeQuery(q: Object) {                                                      // literales Objekt

    const baseQuery = { type: 'Questionnaire', query: { _count: this.pageSize } };    //Liste von Questionnaires ausgeben; query: { _count:                                                                                    this.pageSize } _wir wollen die ersten 10 s
    if (q) {
      return Object.assign({}, baseQuery, { query: Object.assign(baseQuery.query, q) });
    }
    return baseQuery;
  }

  private search(query) {                                                             // macht REST CALL
    console.log('** before fhirHttpService.search, query: ' + JSON.stringify(query));
    this.fhirHttpService.search(query).then(response => {
      this.data$.next(<fhir.Bundle>response.data);                                    // data ist eine property von response.
      console.log('** after fhirHttpService.search, hits: ' + this.length);
    });
  }

  ngOnInit() {
    this.data$.subscribe((questionnairesBundle: fhir.Bundle) => {
      if (questionnairesBundle) {
        this.dataSource.data = questionnairesBundle.entry;                            // entry enthält generische Questionnaire-Objekte
        this.length = questionnairesBundle.total;
        for (const p of questionnairesBundle.entry) {
          console.log(p);
        }
      }
    });
  }

  selectRow(row) {
    this.sessionService.selectedQuestionnaire = row.resource;
    alert('selected: ' + JSON.stringify(row.resource));
    console.log(this.sessionService.selectedQuestionnaire);
    this.router.navigate(['/questionnaire-form']);
  }

  getQName(entry: fhir.BundleEntry) {
    const quest = (<fhir.Questionnaire>entry.resource);
    if (quest) {
      const line = quest.title + ' | ' + quest.id + ' | ' + quest.publisher; // Anzeige Questionnaire in questionnaire-list
      return line;
    }
    return '-';
  }

  doSearch() {

    const idSearchString = this.elId.nativeElement.value;
    const codeSearchString = this.elCode.nativeElement.value;
    const identifierSearchString = this.elIdentifier.nativeElement.value;
    const publisherSearchString = this.elPublisher.nativeElement.value;
    const statusSearchString = this.elStatus.nativeElement.value;
    const titleSearchString = this.elTitle.nativeElement.value;
    const versionSearchString = this.elVersion.nativeElement.value;

    if (idSearchString) {
      this.search(this.makeQuery({ id: idSearchString }));
    }
    if (codeSearchString) {
      this.search(this.makeQuery({ code: codeSearchString }));
    }
    if (identifierSearchString) {
      this.search(this.makeQuery({ identifier: identifierSearchString }));
    }
    if (publisherSearchString) {
      this.search(this.makeQuery({ publisher: publisherSearchString }));
    }
    if (statusSearchString) {
      this.search(this.makeQuery({ status: statusSearchString }));
    }
    if (titleSearchString) {
      this.search(this.makeQuery({ title: titleSearchString }));
    }
    if (versionSearchString) {
      this.search(this.makeQuery({ version: versionSearchString }));
    }

  }
}