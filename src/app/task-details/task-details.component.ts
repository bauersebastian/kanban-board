import { Component, OnInit } from '@angular/core';
import {Module} from '../shared/module';
import {Column} from '../shared/column';
import { TaskAll, Task } from '../shared/task';
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
  existingTaskId = '';
  existingTaskResponse: Task;
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
    this.getAllColumns();
    this.getAllModules();
    this.getAllTasks();
    const params = this.route.snapshot.paramMap;
    if (params.get('id')) {
      this.existingTask = true;
      this.existingTaskId = params.get('id');
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
    // check if we have a task with the same name, since they have to be unique according to our backend
    if (this.checkDuplicate()) {
      this.errorMessage = 'Eine Aufgabe mit gleichem Namen existiert bereits!';
      this.openSnack();
      console.log(this.errorMessage);
      return false;
    }
    if (this.checkLimit(task.column._id)) {
      this.errorMessage = 'Das Limit an Aufgaben für diesen Prozessschritt ist erreicht!';
      this.openSnack();
      console.log(this.errorMessage);
      return false;
    }
    this.ts
      .add(task)
      .subscribe(response => {
        console.log('Task gespeichert');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  updateTask() {
    const task = {
      name: this.formData.name,
      description: this.formData.description,
      module: this.formData.module,
      column: this.formData.column,
      _id: this.taskId
    };
    if (this.checkDuplicate()) {
      this.errorMessage = 'Eine Aufgabe mit gleichem Namen existiert bereits!';
      this.openSnack();
      console.log(this.errorMessage);
      return false;
    }

    if (this.checkLimit(task.column._id)) {
      this.errorMessage = 'Das Limit an Aufgaben für diesen Prozessschritt ist erreicht!';
      this.openSnack();
      console.log(this.errorMessage);
      return false;
    }
    this.ts
      .update(task)
      .subscribe(response => {
          console.log('Task aktualisiert');
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      );
  }

  checkDuplicate(): boolean {
    for (const checkTask of this.tasks) {
      if (checkTask.name === this.formData.name && this.existingTaskId !== checkTask._id) {
        return true;
      }
    }
  }
  checkLimit(columnId: string): boolean {
    const columnToCheck = this.columns.find(element => {
      return element._id === columnId;
    });
    let taskCount = 0;
    for (const task of this.tasks) {
      if (task.column === columnId) {
        taskCount += 1;
      }
    }
    // if we are updating a task the limit check can be skipped when we do not update the column of the task
    if (this.existingTask) {
      const taskToCheck = this.tasks.find( element => {
        return element._id === this.existingTaskId;
      });
      if (taskToCheck.column === this.formData.column._id) {
        return false;
      }
    }
    // number of tasks in column can only reach to the limit
    // if limit is zero, we can save as many as we like
    if (taskCount === columnToCheck.limit && columnToCheck.limit !== 0) {
      return true;
    } else { return false; }
  }
  getAllModules() {
    this.ms.getAll()
      .subscribe(response => {
        this.modules = response;
        if (this.modules.length === 0) {
          this.errorMessage = 'Keine Module vorhanden, bitte zuerst anlegen.';
          this.openSnack();
          this.formData.module = undefined;
        }
        // make sure to fill the module in the form if we an have exisiting task
        // it may happen, that getSingleTask is finished before getAllColumns
        if (this.existingTask === true && this.existingTaskResponse.module !== undefined && this.formData.module === undefined) {
          this.formData.module = this.modules.filter(i => i._id === this.existingTaskResponse.module._id)[0];
        }
      });
  }
  getAllColumns() {
    this.cs.getAll()
      .subscribe(response => {
        this.columns = response;
        if (this.columns.length === 0) {
          this.errorMessage = 'Keine Prozessschritte vorhanden, bitte zuerst anlegen.';
          this.openSnack();
          this.formData.column = undefined;
        }
        // make sure to fill the column in the form if we an have exisiting task
        // it may happen, that getSingleTask is finished before getAllColumns
        if (this.existingTask === true && this.existingTaskResponse.column !== undefined && this.formData.column === undefined) {
          this.formData.column = this.columns.filter(i => i._id === this.existingTaskResponse.column._id)[0];
        }
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
        //we have to use a filter on the modules and columns, since we use these arrays in the select options
        //to use response.module would not work!
        this.formData.module = this.modules.filter(i => i._id === response.module._id)[0];
        this.formData.column = this.columns.filter(i => i._id === response.column._id)[0];
        this.taskId = response._id;
        this.existingTaskResponse = response;
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
