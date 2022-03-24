import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'api';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
    ) { }

    getCompanies(search: string): Observable<any[]> {
        const url = `${this.apiUrl}/autocomplete?symbol=${search}`;
        return this.http.get<any>(url)
            .pipe(
                map(obj => obj.result)
            )
        //return this.http.get<object>(url).pipe(
        //    tap(_ => console.log(`fetched autocomplete for search=${search}`)),
        //    catchError(this.handleError<object>(`getCompanies search=${search}`))
        //);
    }

    getDescription(ticker: string): Observable<object> {
        const url = `${this.apiUrl}/description?symbol=${ticker}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched description for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getDescription ticker=${ticker}`))
        );
    }

    getQuote(ticker: string): Observable<object> {
        const url = `${this.apiUrl}/quote?symbol=${ticker}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched quote for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getQuote ticker=${ticker}`))
        );
    }

    getPeers(ticker: string): Observable<object> {
        const url = `${this.apiUrl}/peers?symbol=${ticker}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched peers for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getPeers ticker=${ticker}`))
        );
    }

    getHistoricalData(ticker: string, resolution: number, from: number, to: number): Observable<object> {
        const url = `${this.apiUrl}/historical?symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched historical data for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getHistoricalData ticker=${ticker}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`)

            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }
}