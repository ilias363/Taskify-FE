import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, MatButtonModule, MatMenuModule, MatIconModule],
  template: `
    <header
      class="w-full sticky top-0 left-0 z-50 p-4 flex justify-between items-center bg-purple-300 text-black shadow-lg"
    >
      <a routerLink="/dashboard">
        <img src="logos/logo_purple.png" alt="Logo" class="w-44" />
      </a>

      <div class="relative">
        <button
          [matMenuTriggerFor]="menu"
          class="flex items-center text-xl font-semibold hover:text-gray-700 focus:outline-none"
        >
          <span *ngIf="authUser()"
            >{{ authUser()?.['firstName'] }}
            {{ authUser()?.['lastName'] }}</span
          >
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #menu="matMenu" xPosition="before" class="mt-2">
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);
  authUser = signal(null);

  ngOnInit() {
    this.authService.getAuthUserInfo().subscribe({
      next: (response) => {
        this.authUser.set(response.body.data);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message, errorType: 'User Info' },
        });
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message, errorType: 'Logout' },
        });
      },
      complete: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
    });
  }
}
