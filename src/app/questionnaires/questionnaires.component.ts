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
import { Questionnaire } from '../models/questionnaire';
import { Item } from '../models/item';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {
  selectedRowIndex: any;

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

  constructor(
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,

  ) {
    this.data$ = new BehaviorSubject(null);
    this.search(this.makeQuery(null));
  }

  private makeQuery(q: Object) {
    const base = { type: 'Questionnaire', query: { _count: this.pageSize } };
    if (q) {
      return Object.assign({}, base, { query: Object.assign(base.query, q) });
    }
    return base;
  }

  private search(query) { // macht REST CALL
    console.log('** before fhirHttpService.search, query: ' + JSON.stringify(query));

    this.fhirHttpService.search(query).then(response => {
      this.data$.next(<fhir.Bundle>response.data);                          // data ist eine property von response.
      console.log('** after fhirHttpService.search, hits: ' + this.length);
    });
  }

  ngOnInit() {
    this.data$.subscribe((questionnairesBundle: fhir.Bundle) => {
      if (questionnairesBundle) {
        this.bundle = questionnairesBundle;
        this.dataSource.data = questionnairesBundle.entry;                  // entry enthält generische Questionnaire-Objekte
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

  /*selectRow(row) {
    alert('selected: ' + JSON.stringify(row.resource));
    console.log(JSON.stringify(row.resource));
    return (JSON.stringify(row.resource));
  }*/

  convertToQuestionnaire(obj: any): Questionnaire {
    obj = obj.Questionnaire;
    let q = this.extractQuestionnaireHeader(obj);
    q.items = [];
    obj.item.forEach(i => q.items.push(this.extractItem(i)));
    return q;
  }

  private extractQuestionnaireHeader(obj: any): Questionnaire {
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
  }

  // accessible for tests
  extractItem(obj: any): Item {
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
  }

  getQName(entry: fhir.BundleEntry) {
    const quest = (<fhir.Questionnaire>entry.resource);
    if (quest) {
      const line = quest.resourceType + ': ' + quest.title + ' | ' + quest.id;
      return line;
    }
    return '-';
  }
}
