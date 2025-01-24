import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
  <div class="flex flex-col items-center justify-center h-screen">
    <p>home works!</p>
    <a routerLink="/login">Login</a>
    <a routerLink="/signup">Signup</a>
    <button (click)="logout()">Logout</button>
  </div>
  `,
  styles: ``,
})
export class HomeComponent {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authService.getMyInfo().subscribe({
      next: (response) => {
        console.log('User info:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('User info complete');
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.clear();
        this.router.navigate(['/login']);
        console.log('Logout success:', response);
      },
      error: (error) => {
        console.error('Error:', error.message);
      },
      complete: () => {
        console.log('Logout complete');
      },
    });
  }
}
