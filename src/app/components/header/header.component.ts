import { Component, inject, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { NgIf } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    AvatarModule,
  ],
  template: `
    <header
      class="w-full sticky top-0 left-0 z-50 p-2 flex justify-between items-center bg-purple-300 text-black shadow-lg"
    >
      <a routerLink="/dashboard">
        <img src="logos/logo_purple.png" alt="Logo" class="w-44" />
      </a>

      <div class="relative flex items-center w-lg">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <mat-icon [style]="{ color: 'var(--color-gray-800)' }">search</mat-icon>
        </div>
        <input
          type="text"
          class="bg-white border border-gray-300 text-gray-800 text-md rounded-lg block w-full ps-10 p-2.5 shadow-md"
          placeholder="Search tasks by name or description..."
          (input)="onSearchInput($event)"
        />
      </div>
      <div class="relative">


        <button
          [matMenuTriggerFor]="menu"
          class="flex items-center justify-center cursor-pointer focus:outline-hidden"
        >
          <p-avatar
            [label]="authUser()?.['firstName']?.charAt(0) + authUser()?.['lastName']?.charAt(0)"
            styleClass="mr-0"
            size="normal"
            [style]="{
              'background-color': 'var(--color-gray-200)',
              'color': 'var(--color-gray-700)',
              'font-size': '1.5rem',
              'font-weight': 'bold',
              'padding': '1.4rem',
            }"
          />
          <mat-icon [inline]="true" style="font-size: 34px;"
            >arrow_drop_down</mat-icon
          >
        </button>
        <mat-menu #menu="matMenu" class="mt-2">
          <ng-container *ngIf="authUser()">
            <div class="px-4">
              <div>
                {{ authUser()?.['firstName'] }} {{ authUser()?.['lastName'] }}
              </div>
              <div class="text-sm text-gray-500">
                {{ authUser()?.['email'] }}
              </div>
            </div>
          </ng-container>

          <mat-divider></mat-divider>

          <button mat-menu-item (click)="navigateToProfile()">
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
  authUser = signal<any>(null);
  onSearchInputEmitter = output<string>();

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

  navigateToProfile() {
    this.router.navigate(['/profile']);
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

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onSearchInputEmitter.emit(input.value);
  }
}
