import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Module} from './module';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private api = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Module[]> {
    return this.http.get<any[]>(`${this.api}/modules`);
  }
  getSingle(id: string): Observable<Module> {
    return this.http.get<any>(`${this.api}/modules/${id}`);
  }
  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/modules/${id}`, {responseType: 'text'});
  }
  addModule(module: Module): Observable<any> {
    console.log(module);
    return this.http.post(`${this.api}/modules`, module, httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }
}
