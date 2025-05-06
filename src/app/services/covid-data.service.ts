  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { catchError, throwError } from 'rxjs';

  @Injectable({ providedIn: 'root' })
  export class CovidDataService {
    private apiUrl = 'https://api.rootnet.in/covid19-in/stats/history';

    constructor(private http: HttpClient) { }

    getLatestRegionalData() {
      return this.http.get<any>(this.apiUrl).pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return throwError(() => error);
        })
      );
    }
  }
