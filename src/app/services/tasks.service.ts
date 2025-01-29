import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../utils/data.models';

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

  createTask(task: Task): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/tasks/create`, task, { observe: 'response', withCredentials: true });
  }

  getTask(id: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`, { observe: 'response', withCredentials: true });
  }

  deleteTask(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, { observe: 'response', withCredentials: true });
  }

  updateTask(task: Task): Observable<HttpResponse<any>> {
    return this.http.put(`${this.apiUrl}/tasks/${task.id}`, task, { observe: 'response', withCredentials: true });
  }
  
  startTask(task: Task): Observable<HttpResponse<any>> {
    task.status = 'IN_PROGRESS';
    return this.updateTask(task);
  }
  
  completeTask(task: Task): Observable<HttpResponse<any>> {
    task.status = 'COMPLETED';
    return this.updateTask(task);
  }

  cancelTask(task: Task): Observable<HttpResponse<any>> {
    task.status = 'CANCELLED';
    return this.updateTask(task);
  }
}
