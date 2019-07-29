import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { Module } from '../shared/module';
import { Task, TaskAll } from '../shared/task';
import { Column } from '../shared/column';

@Component({
  selector: 'kb-module-row',
  templateUrl: './module-row.component.html',
  styleUrls: ['./module-row.component.css']
})
export class ModuleRowComponent implements OnInit, OnChanges {
  @Input() module: Module;
  @Input() columnLength: number;
  @Input() tasks: Array<TaskAll>;
  @Input() columns: Array<Column>;
  @Output() taskToDelete = new EventEmitter();
  @Output() moduleToDelete = new EventEmitter();
  heightOfRow = 0;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // the height has to be recalculated on changes
    this.heightOfRow = this.calculateRowHeight();
  }

  deleteTask(id) {
    this.taskToDelete.emit(id);
  }

  deleteModule(id) {
    this.moduleToDelete.emit(id);
  }

  // we have to calculate the row height dynamically, as we have to set a proper height for the mat-grid-list
  calculateRowHeight() {
    // one card is 160px of height
    const rowHeight = 160;
    let taskCount = 1;
    // we need to get the highest number of tasks per column
    for (const column of this.columns) {
      const counter = this.tasks.filter(i => i.column === column._id).length;
      if (counter > taskCount) {
        taskCount = counter;
      }
    }
    return rowHeight * taskCount;
  }

}
