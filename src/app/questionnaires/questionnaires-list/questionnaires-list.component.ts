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


  @ViewChild('filter_id')
  private filter_id: ElementRef;

  @ViewChild('filter_code')
  private filter_code: ElementRef;

  @ViewChild('identifier')
  private identifier: ElementRef;

  @ViewChild('publisher')
  private publisher: ElementRef;


  //  @ViewChild('filter')
  //  private filterInput: ElementRef;

  private data$: BehaviorSubject<fhir.Bundle>;            // data$ ist ein observable

  constructor(
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
    private parserService: ParserService,
  ) {
    this.data$ = new BehaviorSubject(null);               // data$ gibt die Daten aus, die vom Backend empfangen worden sind.
    this.search(this.makeQuery({ title: 'ebida' }));
  }

  private makeQuery(q: Object) {
    const base = { type: 'Questionnaire', query: { _count: this.pageSize } };
    if (q) {
      return Object.assign({}, base, { query: Object.assign(base.query, q) });
    }
    return base;
  }

  private search(query) {                                               // macht REST CALL
    console.log('** before fhirHttpService.search, query: ' + JSON.stringify(query));

    this.fhirHttpService.search(query).then(response => {
      this.data$.next(<fhir.Bundle>response.data);                      // data ist eine property von response.
      console.log('** after fhirHttpService.search, hits: ' + this.length);
    });
  }

  ngOnInit() {
    this.data$.subscribe((questionnairesBundle: fhir.Bundle) => {
      if (questionnairesBundle) {
        this.dataSource.data = questionnairesBundle.entry;             // entry enthält generische Questionnaire-Objekte
        this.length = questionnairesBundle.total;
        for (const p of questionnairesBundle.entry) {
          console.log(p);
        }
      }
    });
    // event listener für den Filter
    /*Observable.fromEvent(this.filterInput.nativeElement, 'keyup')     // keyup ist der Event
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(() => {
        const searchString = this.filterInput.nativeElement.value;
        this.search(this.makeQuery({ title: searchString }));         // Filter z.B. Ebida im Suchfeld; title
      });*/
  }

  selectRow(row) {
    this.sessionService.selectedQuestionnaire = row.resource;        // row.resource in die Variable des sessionService setzen
    alert('selected: ' + JSON.stringify(row.resource));
    console.log(this.sessionService.selectedQuestionnaire);
  }

  getQName(entry: fhir.BundleEntry) {
    const quest = (<fhir.Questionnaire>entry.resource);
    if (quest) {
      const line = quest.title + ' | ' + quest.id;
      return line;
    }
    return '-';
  }
}

