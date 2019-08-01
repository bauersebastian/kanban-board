import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Column} from './column';
import {ApiService} from './api.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(
    private http: HttpClient,
    private as: ApiService
  ) {
  }
  // get all columns
  getAll(): Observable<Column[]> {
    return this.http.get<any[]>(`${this.as.api}/columns`);
  }
  // get a single column by id
  getSingle(id: string): Observable<Column> {
    return this.http.get<any>(`${this.as.api}/columns/${id}`);
  }
  // remove a column by id
  remove(id: string): Observable<any> {
    return this.http.delete(`${this.as.api}/columns/${id}`, this.as.httpOptions)
      .pipe(catchError(this.as.errorHandler));
  }
  // add a new column
  add(column: Column): Observable<any> {
    console.log(column);
    return this.http.post(`${this.as.api}/columns`, column, this.as.httpOptions)
      .pipe(catchError(this.as.errorHandler));
  }
}
