/// <reference path="../../../../node_modules/@types/fhir/index.d.ts" />

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
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
  bundle: fhir.Bundle;

  dataSource = new MatTableDataSource<fhir.BundleEntry>();

  length = 100;
  pageSize = 10;
  oldPageIndex = 0;
  pageSizeOptions = [this.pageSize];
  searchString: any;

  @ViewChild('language')
  private elLanguage: ElementRef;

  @ViewChild('date')
  private elDate: ElementRef;

  @ViewChild('identifier')
  private elIdentifier: ElementRef;

  @ViewChild('code')
  private elCode: ElementRef;

  @ViewChild('jurisdiction')
  private elJurisdiction: ElementRef;

  @ViewChild('description')
  private elDescription: ElementRef;

  @ViewChild('title')
  private elTitle: ElementRef;

  @ViewChild('version')
  private elVersion: ElementRef;

  @ViewChild('url')
  private elUrl: ElementRef;

  @ViewChild('effective')
  private elEffective: ElementRef;

  @ViewChild('name')
  private elName: ElementRef;

  @ViewChild('publisher')
  private elPublisher: ElementRef;

  @ViewChild('id')
  private elId: ElementRef;

  @ViewChild('status')
  private elStatus: ElementRef;

  private data$: BehaviorSubject<fhir.Bundle>;            // data$ ist ein observable

  constructor
    (
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private router: Router,

  ) {

    this.data$ = new BehaviorSubject(null);               // data$ gibt die Daten aus, die vom Backend empfangen worden sind.
    // this.search(this.makeQuery({ title: 'ebida' }));   // {} ist immer ein objekt
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

  private makeQuery(q: Object) {                          // literales Objekt
    const baseQuery = {
      type: 'Questionnaire',                              //Liste von Questionnaires ausgeben; query: { _count: 10 Seiten
      query: {
        _count: this.pageSize,
        //  _summary: true
      },
    };

    if (q) {
      return Object.assign({}, baseQuery, { query: Object.assign(baseQuery.query, q) });
    }
    return baseQuery;                                     //else
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
        /*for (const p of questionnairesBundle.entry) {
          console.log(p);*/
      }
    }
    );
  }

  selectRow(row) {
    this.sessionService.selectedQuestionnaire = row.resource;
    // alert('selected: ' + JSON.stringify(row.resource));
    console.log(this.sessionService.selectedQuestionnaire);
    this.router.navigate(['/questionnaire-form']);
  }

  getQName(entry: fhir.BundleEntry) {
    const quest = (<fhir.Questionnaire>entry.resource);
    if (quest) {
      const line =
        quest.title           // Anzeige Questionnaire in questionnaire-list
        + ' | '
        + quest.date
        + ' | '
        + quest.id
        + ' | '
        + quest.publisher;

      return line;
    }
    return '-';
  }

  doSearch() {

    const languageSearchString = this.elLanguage.nativeElement.value;
    const dateSearchString = this.elDate.nativeElement.value;
    const identifierSearchString = this.elIdentifier.nativeElement.value;
    const codeSearchString = this.elCode.nativeElement.value;
    const jurisdictionSearchString = this.elJurisdiction.nativeElement.value;
    const descriptionSearchString = this.elDescription.nativeElement.value;
    const titleSearchString = this.elTitle.nativeElement.value;
    const versionSearchString = this.elVersion.nativeElement.value;
    const urlSearchString = this.elUrl.nativeElement.value;
    const effectiveSearchString = this.elEffective.nativeElement.value;
    const nameSearchString = this.elName.nativeElement.value;
    const publisherSearchString = this.elPublisher.nativeElement.value;
    const idSearchString = this.elId.nativeElement.value;
    const statusSearchString = this.elStatus.nativeElement.value;

    let searchParams = {}

    if (titleSearchString) {
      searchParams = Object.assign(searchParams, { title: titleSearchString })
      // this.search(this.makeQuery(searchParams));
    }

    if (publisherSearchString) {
      searchParams = Object.assign(searchParams, { publisher: publisherSearchString })
      // this.search(this.makeQuery(searchParams));
    }

    if (idSearchString) {
      searchParams = Object.assign(searchParams, { _id: idSearchString })
      // this.search(this.makeQuery(searchParams));
    }

    if (languageSearchString) {
      searchParams = Object.assign(searchParams, { _language: languageSearchString })
      // this.search(this.makeQuery(searchParams));
    }

    if (codeSearchString) {
      searchParams = Object.assign(searchParams, { code: codeSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (dateSearchString) {
      searchParams = Object.assign(searchParams, { date: dateSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (descriptionSearchString) {
      searchParams = Object.assign(searchParams, { description: descriptionSearchString })
      // this.search(this.makeQuery(searchParams));
    }

    if (effectiveSearchString) {
      searchParams = Object.assign(searchParams, { effective: effectiveSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (identifierSearchString) {
      searchParams = Object.assign(searchParams, { identifier: identifierSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (jurisdictionSearchString) {
      searchParams = Object.assign(searchParams, { jurisdiction: jurisdictionSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (nameSearchString) {
      searchParams = Object.assign(searchParams, { name: nameSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (statusSearchString) {
      searchParams = Object.assign(searchParams, { status: statusSearchString })
      // this.search(this.makeQuery(searchParams));
    }

    if (urlSearchString) {
      searchParams = Object.assign(searchParams, { url: urlSearchString })
      //this.search(this.makeQuery(searchParams));
    }

    if (versionSearchString) {
      searchParams = Object.assign(searchParams, { version: versionSearchString })
      //this.search(this.makeQuery(searchParams));
    }
    this.search(this.makeQuery(searchParams));

  }

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
