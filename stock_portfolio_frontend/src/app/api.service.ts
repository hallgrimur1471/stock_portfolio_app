import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    APIErrorAlertMessage: string = '';
    APIErrorAlertSubject = new Subject<string>();

    @ViewChild('APIErrorAlert', { static: false }) APIErrorAlert!: NgbAlert;

    private apiUrl = 'api';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
    ) {
        this.APIErrorAlertSubject.subscribe(message => this.APIErrorAlertMessage = message);
        this.APIErrorAlertSubject.pipe(debounceTime(20000)).subscribe(() => {
            if (this.APIErrorAlert) {
                this.APIErrorAlert.close();
            }
        });
    }

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

    getDescription(ticker: string): Observable<any> {
        const url = `${this.apiUrl}/description?symbol=${ticker}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched description for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getDescription ticker=${ticker}`))
        );
    }

    getQuote(ticker: string): Observable<any> {
        const url = `${this.apiUrl}/quote?symbol=${ticker}`;
        return this.http.get<any>(url).pipe(
            // map(quote => {
            //     quote.c += (Math.random() * 1000) - 500; // TODO: remove
            //     return quote;
            // }),
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

    getHistoricalData(ticker: string, resolution: string, from: number, to: number): Observable<object> {
        const url = `${this.apiUrl}/historical?symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched historical data for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getHistoricalData ticker=${ticker}`))
        );
    }

    getSocialSentiment(ticker: string): Observable<object> {
        const url = `${this.apiUrl}/social?symbol=${ticker}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched social sentiment data for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getSocialSentiment ticker=${ticker}`))
        );
    }

    getNews(ticker: string, from: string, to: string): Observable<object> {
        const url = `${this.apiUrl}/news?symbol=${ticker}&from=${from}&to=${to}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched news data for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getNews ticker=${ticker}`))
        );
    }

    getTrends(ticker: string): Observable<object> {
        const url = `${this.apiUrl}/trends?symbol=${ticker}`;
        return this.http.get<object>(url).pipe(
            tap(_ => console.log(`fetched trends data for ticker=${ticker}`)),
            catchError(this.handleError<object>(`getTrends ticker=${ticker}`))
        );
    }

    getEarnings(ticker: string): Observable<any[]> {
        const url = `${this.apiUrl}/earnings?symbol=${ticker}`;
        return this.http.get<any[]>(url).pipe(
            tap(_ => console.log(`fetched earnings data for ticker=${ticker}`)),
            catchError(this.handleError<any[]>(`getEarnings ticker=${ticker}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            const error_msg: string = error.error.error;
            this.APIErrorAlertSubject.next(error_msg);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }
}