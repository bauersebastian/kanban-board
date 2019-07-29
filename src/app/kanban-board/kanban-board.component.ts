import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../shared/module.service';
import {Module} from '../shared/module';
import {Column} from '../shared/column';
import {Task, TaskAll} from '../shared/task';
import {ColumnService} from '../shared/column.service';
import {TaskService} from '../shared/task.service';

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

  constructor(
    private ms: ModuleService,
    private cs: ColumnService,
    private ts: TaskService,
  ) { }

  ngOnInit() {
    this.getAllModules();
    this.getAllColumns();
    this.getAllTasks();
  }

  getAllModules() {
    this.ms.getAll()
    .subscribe(modules => {
      this.modules = modules;
    });
  }
  getAllColumns() {
    this.cs.getAll()
      .subscribe(columns => {
        this.columns = columns;
        this.columnLength = columns.length + 1;
      });
  }
  getAllTasks() {
    this.ts.getAll()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }
  getTaskByModule(module: Module) {
    let moduleTasks: Array<TaskAll> = [];
    for (let task of this.tasks) {
      if (task.module === module._id) {
        moduleTasks.push(task);
      }
    }
    return moduleTasks;
  }
  deleteModule(id) {
    if (confirm('Modul wirklich löschen?')) {
      this.ms.remove(id)
        .subscribe(response => {
          console.log('Modul gelöscht');
          console.log(response);
          this.getAllModules();
        });
    }
  }

  deleteColumn(id) {
    if (confirm('Prozessschritt wirklich löschen?')) {
      this.cs.remove(id)
        .subscribe(response => {
          console.log('Prozessschritt gelöscht');
          this.getAllColumns();
        }, err => this.errorMessage = 'Es wurden wohl noch nicht alle Aufgaben in diesem Prozessschritt gelöscht!');
    }
  }

  deleteTask(id) {
    if (confirm('Aufgabe wirklich löschen?')) {
      this.ts.remove(id)
        .subscribe(response => {
          console.log('Task gelöscht');
          this.getAllTasks();
        });
    }
  }
}
