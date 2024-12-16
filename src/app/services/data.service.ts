import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private apiUrl = 'https://localhost:7152/api/v1/contact'; // Replace with your API URL

    constructor(private http: HttpClient) { 

    }

    getData(): Observable <any> {
      return this.http.get(this.apiUrl);
    }

    getDataById(id: any): Observable <any> {
      return this.http.get(this.apiUrl + '/' + id);
    }

    deleteData(id: any): Observable <any> {
      return this.http.delete(this.apiUrl + '/' + id);
    }

    postData(body: any): Observable <any> {
        var headers = new HttpHeaders({'Content-Type': 'application/json;'});
        return this.http.post(this.apiUrl, body, { headers });
    }

    putData(body: any, id: any): Observable <any> {
      var headers = new HttpHeaders({'Content-Type': 'application/json;'});
      return this.http.put(this.apiUrl + '/' + id, body, { headers });
  }
}
