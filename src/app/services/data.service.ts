import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://localhost:7152/api/v1/contact'; // Replace with your API URL

  constructor(private http: HttpClient) {

  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getDataById(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  deleteData(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  postData(body: any): Observable<any> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  putData(body: any, id: any): Observable<any> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.http.put(this.apiUrl + '/' + id, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    
    let errorMessage : string = "";
    switch (error.status) {
      case HttpStatusCode.NotFound:
        errorMessage = 'Resource not found in the system.';
        break;

      case HttpStatusCode.Forbidden:
        errorMessage = 'Something bad happened; please try again later.';
        break;

      case HttpStatusCode.InternalServerError, 0:
        errorMessage = 'Something bad happened; please try again later.';
        break;

    }
    return throwError(() => new Error(errorMessage));
  }

}
