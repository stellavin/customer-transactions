import { Deposits } from './../_model/deposits';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiurl = 'api/deposits';   // Our created Deposit Data can be accessed here at api/deposits
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  perfop = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

// A function to handle errors
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
