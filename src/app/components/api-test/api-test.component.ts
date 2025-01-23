import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-api-test',
  imports: [],
  template: `
    <div>
      Data works!
    </div>
  `,
  styles: ``,
})
export class ApiTestComponent {
  
  data = signal<any[]>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('auth/test').subscribe({
      next: (response) => {
        this.data.update((data) => [...data, response]);
        console.log('Data:', response);
      },
      error: (error) => {
        console.error('Error:', error.message);
      },
      complete: () => {
        console.log('Complete');
      },
    });
    
    this.apiService.postData('auth/test', {email: 'some@email.com', password: '123456'}).subscribe({
      next: (response) => {
        this.data.update((data) => [...data, response]);
        console.log('Data:', response);
      },
      error: (error) => {
        console.error('Error:', error.message);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
