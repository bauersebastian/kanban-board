import { Component, OnInit, Input } from '@angular/core';
import {Column} from '../shared/column';

@Component({
  selector: 'kb-process-column',
  templateUrl: './process-column.component.html',
  styleUrls: ['./process-column.component.css']
})
export class ProcessColumnComponent implements OnInit {
  @Input() column: Column;

  constructor() { }

  ngOnInit() {
  }

}
