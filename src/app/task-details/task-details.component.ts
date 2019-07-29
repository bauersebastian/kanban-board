import { Component, OnInit } from '@angular/core';
import {Module} from '../shared/module';
import {Column} from '../shared/column';
import { TaskAll } from '../shared/task';
import {ModuleService} from '../shared/module.service';
import {ColumnService} from '../shared/column.service';
import {TaskService} from '../shared/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'kb-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  columns: Column[] = [];
  modules: Module[] = [];
  tasks: TaskAll[] = [];
  errorMessage = '';
  existingTask = false;
  taskId = '';
  formData = {
    name: '',
    description: '',
    module: {} as Module,
    column: {} as Column
  };
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
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllModules();
    this.getAllColumns();
    this.getAllTasks();
    const params = this.route.snapshot.paramMap;
    if (params.get('id')) {
      this.existingTask = true;
      this.getSingleTask(params.get('id'));
    }
  }

  save() {
    if (this.existingTask) {
      this.updateTask();
    } else {
      this.saveTask();
    }
  }

  saveTask() {
    const task = {
      name: this.formData.name,
      description: this.formData.description,
      module: this.formData.module,
      column: this.formData.column
    };
    let duplicate = false;
    for (const checkTask of this.tasks) {
      if (checkTask.name === this.formData.name) {
        duplicate = true;
      }
    }
    // check if we have a task with the same name, since they have to be unique according to our backend
    if (duplicate === true) {
      this.errorMessage = 'Eine Aufgabe mit gleichem Namen existiert bereits!';
      this.openSnack();
      console.log(this.errorMessage);
    }
    if (duplicate === false) {
      this.ts
        .add(task)
        .subscribe(response => {
          console.log('Task gespeichert');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
    }
  }

  updateTask() {
    const task = {
      name: this.formData.name,
      description: this.formData.description,
      module: this.formData.module,
      column: this.formData.column,
      _id: this.taskId
    };
    this.ts
      .update(task)
      .subscribe(response => {
        console.log('Task aktualisiert');
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
      );
  }

  getAllModules() {
    this.ms.getAll()
      .subscribe(response => {
        this.modules = response;
      });
  }
  getAllColumns() {
    this.cs.getAll()
      .subscribe(response => {
        this.columns = response;
      });
  }

  getAllTasks() {
    this.ts.getAll()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  getSingleTask(id) {
    this.ts.getSingle(id)
      .subscribe(response => {
        this.formData.name = response.name;
        this.formData.description = response.description;
        this.formData.module = this.modules.filter(i => i._id === response.module._id)[0];
        this.formData.column = this.columns.filter(i => i._id === response.column._id)[0];
        this.taskId = response._id;
      });
  }

  openSnack() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.errorMessage, this.action ? this.actionButtonLabel : undefined, config);
  }
}
