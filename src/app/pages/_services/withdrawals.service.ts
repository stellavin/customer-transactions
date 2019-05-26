
import { Withdrawals } from './../_model/deposits';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalsService {

  apiurl = 'api/withdrawals';   // Our created Withdrawals Data can be accessed here at api/withdrawals
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
getWithdrawals(): Observable<Withdrawals[]> {
    return this.http.get<Withdrawals[]>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

//   a function to add deposits
add(withdrawal: Withdrawals): Observable<Withdrawals> {
    withdrawal.id = null;
    return this.http.post<Withdrawals>(this.apiurl, withdrawal, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
}

// delete

delete(id: number): Observable<Withdrawals> {
  const url = `${this.apiurl}/${id}`;
  return this.http.delete<Withdrawals>(url, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

// update

update(withdrawal: Withdrawals): Observable<Withdrawals> {
  const url = `${this.apiurl}/${withdrawal.id}`;
  return this.http.put<Withdrawals>(this.apiurl, withdrawal, this.httpOptions).pipe(
    map(() => withdrawal),
    catchError(this.handleError)
  );
}

}
