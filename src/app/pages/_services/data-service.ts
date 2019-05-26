
import { Deposits } from './../_model/deposits';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiurl = 'api/deposits';   // Our created Deposit Data can be accessed here at api/deposits
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

// A function to handle errors
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

// Fetch Deposit data
getDeposits(): Observable<Deposits[]> {
    return this.http.get<Deposits[]>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

//   a function to add deposits
addDeposits (deposit: Deposits): Observable<Deposits> {
    deposit.id = null;
    return this.http.post<Deposits>(this.apiurl, deposit, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
}

// delete

delete(id: number): Observable<Deposits> {
  const url = `${this.apiurl}/${id}`;
  return this.http.delete<Deposits>(url, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

// update

update(deposit: Deposits): Observable<Deposits> {
  const url = `${this.apiurl}/${deposit.id}`;
  return this.http.put<Deposits>(this.apiurl, deposit, this.httpOptions).pipe(
    map(() => deposit),
    catchError(this.handleError)
  );
}

}
