import { Component, OnInit } from '@angular/core';
import {ColumnService} from '../shared/column.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'kb-column-details',
  templateUrl: './column-details.component.html',
  styleUrls: ['./column-details.component.css']
})
export class ColumnDetailsComponent implements OnInit {
  // initialise the form with some data
  formData = {
    name: '',
    limit: 0
  };

  constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
  // save a new column
  saveColumn() {
    this.columnService
      .add(this.formData)
      .subscribe(column => {
        console.log('Speichern von Spalte erfolgt');
        // go back to the KanbanBoard
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}
