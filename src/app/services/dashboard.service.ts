import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,) {
   }

  getIncomeReport(): Observable<any> {
    let url = 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo';

    return this.http
        .get<any>(url)
        .pipe(
          catchError((err) => {
            console.log(err);
            return throwError(() => err);   
          }),
        );
   }

   getEarningsReport() : Observable<any>{
     let url = "https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=demo";
     return this.http
      .get(url)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        } )
      )
   }
}
