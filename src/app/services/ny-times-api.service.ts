import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NyTimesAPIService {

  constructor(private http: HttpClient) { }

  getArticles(param?:string): Observable<any> {
    let params = new HttpParams();

    if(param){
     params =  params.append("q",param)
    }
    params = params.append("api-key", "4LCZtAkLnz1Sgi2b3jf7xIYAxgpAAh99");

    let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    return this.http
        .get<any>(url,{params})
        .pipe(
          catchError((err) => {
            console.log(err);
            return throwError(() => err);   
          }),
        );
   }

   getTopStories(param:string): Observable<any> {
    let params = new HttpParams();
    params = params.append("api-key", "4LCZtAkLnz1Sgi2b3jf7xIYAxgpAAh99");

    let url = `https://api.nytimes.com/svc/topstories/v2/${param}.json`;

    return this.http
        .get<any>(url,{params})
        .pipe(
          catchError((err) => {
            console.log(err);
            return throwError(() => err);   
          }),
        );
   }




}
