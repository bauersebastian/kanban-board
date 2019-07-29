import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

/* this service is just a helper function in order to hold the config for the api in one place */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }

  constructor() { }
}
