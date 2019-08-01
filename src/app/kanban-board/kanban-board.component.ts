import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../shared/module.service';
import {Module} from '../shared/module';
import {Column} from '../shared/column';
import {Task, TaskAll} from '../shared/task';
import {ColumnService} from '../shared/column.service';
import {TaskService} from '../shared/task.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'kb-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  modules: Array<Module> = [];
  columns: Array<Column> = [];
  tasks: Array<TaskAll> = [];
  columnLength = 1;
  errorMessage = '';
  // snack bar configuration
  actionButtonLabel =  'Schließen';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private ms: ModuleService,
    private cs: ColumnService,
    private ts: TaskService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // get all necessary data
    this.getAllModules();
    this.getAllColumns();
    this.getAllTasks();
  }
  // return all modules into an array
  getAllModules() {
    this.ms.getAll()
    .subscribe(modules => {
      this.modules = modules;
    });
  }
  // return all columns into an array
  getAllColumns() {
    this.cs.getAll()
      .subscribe(columns => {
        this.columns = columns;
        // set the number of columns for the layout of the board
        this.columnLength = columns.length + 1;
      });
  }
  // return all tasks into an array
  getAllTasks() {
    this.ts.getAll()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }
  // return tasks by a specific module
  getTaskByModule(module: Module) {
    let moduleTasks: Array<TaskAll> = [];
    for (let task of this.tasks) {
      if (task.module === module._id) {
        moduleTasks.push(task);
      }
    }
    return moduleTasks;
  }
  // deleting of modules
  deleteModule(id) {
    if (confirm('Modul wirklich löschen? Falls, vorhanden werden auch alle Aufgaben darin gelöscht!')) {
      this.ms.remove(id)
        .subscribe(response => {
          console.log('Modul gelöscht');
          this.getAllModules();
        });
    }
  }
  // delete a column or return proper error messages
  deleteColumn(id) {
    if (confirm('Prozessschritt wirklich löschen?')) {
      this.cs.remove(id)
        .subscribe(response => {
          console.log('Prozessschritt gelöscht');
          this.getAllColumns();
        }, err => {
          // if we get error 403, it most likely is because of remaining tasks in the column
          if (err.status === 403) {
            this.errorMessage = 'Es wurden wohl noch nicht alle Aufgaben in diesem Prozessschritt gelöscht!';
            console.log(this.errorMessage);
            this.openSnack();
          }
        });
    }
  }
  // delete a specific task
  deleteTask(id) {
    if (confirm('Aufgabe wirklich löschen?')) {
      this.ts.remove(id)
        .subscribe(response => {
          console.log('Task gelöscht');
          this.getAllTasks();
        });
    }
  }
  // display a message in a snack bar
  openSnack() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.errorMessage, this.action ? this.actionButtonLabel : undefined, config);
  }
}
