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
import { Questionnaire } from '../../models/questionnaire';
import { Item } from '../../models/item';
import { SessionService } from '../../services/session.service';
import { ParserService } from '../../services/parser.service';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.css']
})
export class QuestionnairesListComponent implements OnInit {

  selectedRowIndex: any;
  row: any;

  searched = false;
  bundle: fhir.Bundle;
  dataSource = new MatTableDataSource<fhir.BundleEntry>();

  length = 100;
  pageSize = 10;
  oldPageIndex = 0;
  pageSizeOptions = [this.pageSize];

  @ViewChild('filter')
  private filterInput: ElementRef;

  private data$: BehaviorSubject<fhir.Bundle>;            // data$ ist ein observable


  get selectedQuestionnaire(): any {
    return this.sessionService.selectedQuestionnaire;
  }

  set selectedQuestionnaire(value: any) {
    this.sessionService.selectedQuestionnaire = value;
  }



  constructor(
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
    private parserService: ParserService,
  ) {
    this.data$ = new BehaviorSubject(null);               // data$ gibt die Daten aus, die vom Backend empfangen worden sind.
    this.search(this.makeQuery(null));


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
        this.bundle = questionnairesBundle;
        this.dataSource.data = questionnairesBundle.entry;             // entry enthält generische Questionnaire-Objekte
        this.length = questionnairesBundle.total;
        for (const p of questionnairesBundle.entry) {
          console.log(p);
        }
      }
    });
    // event listener für den Filter
    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')     // keyup ist der Event
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(() => {
        const searchString = this.filterInput.nativeElement.value;
        this.search(this.makeQuery({ title: searchString }));         // Filter z.B. Ebida im Suchfeld; title
      });
  }

  selectRow(row) {
    let selectedQuestionnaire = row.resource;                         // row.resource in die Variable des sessionService setzen
    alert('selected: ' + JSON.stringify(row.resource));
    // console.log(JSON.stringify(row.resource));
    // return (JSON.stringify(row.resource));
    console.log(selectedQuestionnaire);
    return selectedQuestionnaire;


  }

  /*convertToQuestionnaire(selectedQuestionnaire: any): Questionnaire {
    selectedQuestionnaire = selectedQuestionnaire.Questionnaire;
    let q = this.extractQuestionnaireHeader(selectedQuestionnaire);
    q.items = [];
    selectedQuestionnaire.item.forEach(i => q.items.push(this.extractItem(i)));
    console.log(q);
    return q;
  }*/





  /*private extractQuestionnaireHeader(obj: any): Questionnaire {
   let q = new Questionnaire();
   q.id = obj.id;
   let text = 'Status: [' + obj.text.status + '] - Note: [' + obj.text.div.pre._text + ']';
   q.text = text;
   q.url = obj.url;
   q.title = obj.title;
   q.status = obj.status;
   q.experimental = obj.experimental;
   q.date = obj.date;
   q.publisher = obj.publisher;
   q.subjectType = obj.subjectType;
   return q;
 }*/

  // accessible for tests
  /*extractItem(selectedQuestionnaire: any): Item {
    let item: Item = new Item();
    item.linkId = selectedQuestionnaire.linkId;
    item.text = selectedQuestionnaire.text;
    item.type = selectedQuestionnaire.type;

    if (selectedQuestionnaire.option) {
      item.options = selectedQuestionnaire.option.map(o => o.valueString);
    }
    if (selectedQuestionnaire.item) {
      item.items = [];
      for (let i of selectedQuestionnaire.item) {
        item.items.push(this.extractItem(i));
      }
    }
    return item;
  }*/

  /*extractItem(obj: any): Item {
    let item: Item = new Item();
    item.linkId = obj.linkId;
    item.text = obj.text;
    item.type = obj.type;

    if (obj.option) {
      item.options = obj.option.map(o => o.valueString);
    }
    if (obj.item) {
      item.items = [];
      for (let i of obj.item) {
        item.items.push(this.extractItem(i));
      }
    }
    return item;
  }*/

  getQName(entry: fhir.BundleEntry) {
    const quest = (<fhir.Questionnaire>entry.resource);
    if (quest) {
      const line = quest.resourceType + ': ' + quest.title + ' | ' + quest.id;
      return line;
    }
    return '-';
  }
}

