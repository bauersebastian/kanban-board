import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, TaskAll} from './task';
import {ApiService} from './api.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private as: ApiService
  ) {
  }

  getAll(): Observable<TaskAll[]> {
    return this.http.get<TaskAll[]>(`${this.as.api}/tasks`);
  }

  getSingle(id: string): Observable<Task> {
    return this.http.get<any>(`${this.as.api}/tasks/${id}`);
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.as.api}/tasks/${task._id}`, task, this.as.httpOptions)
      .pipe(catchError(this.as.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.as.api}/tasks/${id}`, {responseType: 'text'});
  }

  add(task: Task): Observable<any> {
    return this.http.post(`${this.as.api}/tasks`, task, this.as.httpOptions)
      .pipe(catchError(this.as.errorHandler));
  }
}
