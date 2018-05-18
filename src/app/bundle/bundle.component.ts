import { Component, OnInit } from '@angular/core';
import { BundleService } from '../services/bundle.service';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit {

  constructor(private bundleService: BundleService) { }

  ngOnInit() {
  }

}
