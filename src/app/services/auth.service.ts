import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private authUser = null;

  constructor(private http: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<HttpResponse<any>> {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    return this.http.post(
      `${this.apiUrl}/auth/register`,
      { firstName, lastName, email, password },
      { observe: 'response' }
    );
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http
      .post(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          this.authUser = response.body.data;
        })
      );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http
      .post(
        `${this.apiUrl}/auth/logout`,
        {},
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        tap(() => {
          this.authUser = null;
        })
      );
  }

  isLoggedIn(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/auth/isloggedin`, {
      observe: 'response',
      withCredentials: true,
    });
  }

  getAuthUserInfo(): Observable<HttpResponse<any>> {
    if (this.authUser) {
      return of(new HttpResponse({ body: { data: this.authUser } }));
    }

    return this.http
      .get(`${this.apiUrl}/users/me`, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          this.authUser = response.body.data;
        })
      );
  }
}
