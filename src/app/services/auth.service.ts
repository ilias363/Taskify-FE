import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Observable<HttpResponse<any>> {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    return this.http.post(`${this.apiUrl}/auth/register`, { firstName, lastName, email, password }, { observe: 'response' });
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { observe: 'response', withCredentials: true });
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { observe: 'response', withCredentials: true });
  }

  isLoggedIn(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/auth/isloggedin`, { observe: 'response', withCredentials: true });
  }

  getMyInfo(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users/me`, { observe: 'response', withCredentials: true });
  }
}
