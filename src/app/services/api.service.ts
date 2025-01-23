import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API's base URL

  constructor(private http: HttpClient) {}

  // Example GET method
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  // Example POST method
  postData(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, body);
  }

  // Example PUT method
  putData(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, body);
  }

  // Example DELETE method
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
