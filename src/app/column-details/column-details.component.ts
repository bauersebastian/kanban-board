import { Component, OnInit } from '@angular/core';
import {ColumnService} from '../shared/column.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'kb-column-details',
  templateUrl: './column-details.component.html',
  styleUrls: ['./column-details.component.css']
})
export class ColumnDetailsComponent implements OnInit {
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

  saveColumn() {
    this.columnService
      .add(this.formData)
      .subscribe(column => {
        console.log('Speichern von Spalte erledigt');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}
