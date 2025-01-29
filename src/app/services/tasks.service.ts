import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getTasks(statusFilter: string,page: number,  size?: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/tasks?page=${page}&statusfilter=${statusFilter}` + (size ? `&size=${size}` : ''), { observe: 'response', withCredentials: true });
  }

  getStats(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/tasks/stats`, { observe: 'response', withCredentials: true });
  }

  createTask(title: string, description: string, status: string, startDate: string, deadline: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/tasks/create`, { title, description, status, startDate, deadline }, { observe: 'response', withCredentials: true });
  }

  getTask(id: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`, { observe: 'response', withCredentials: true });
  }

  deleteTask(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, { observe: 'response', withCredentials: true });
  }

  updateTask(id: number, title: string, description: string, status: string, deadline: string): Observable<HttpResponse<any>> {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, { title, description, status, deadline }, { observe: 'response', withCredentials: true });
  }
}
