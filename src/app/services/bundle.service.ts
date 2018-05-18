import { Injectable } from '@angular/core';
import { FhirJsHttpService } from 'ng-fhirjs';

@Injectable()
export class BundleService {

  constructor(private fhirHttpService: FhirJsHttpService) {

    bundle: IResource;

    // entry =


    // create bundle

    /** Create Objects */
    // interface Tag { term: string; schema: string; label: string }

    // interface Entry extends Minimal { resource: IResource; category?: Tag[] }

    // declare function http(requestObj: RequestObj): Promise<ResponseObj>;


    /** Create a new resource with a server assigned id */
    // fhirHttpService.create(entry: Entry): Promise<ResponseObj>;

  }


  // interface RequestObj extends Minimal { method: "DELETE" | "GET" | "HEAD" | "JSONP" | "OPTIONS"; url: string, headers?: any, data?: any }
  // interface ResponseObj { status: number; headers?: any; config: any; data: IResource }



}
