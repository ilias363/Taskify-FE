import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  template: `
    <div class="flex flex-col h-full">
      <app-header />
      <div
        class="flex flex-1 flex-col items-center justify-start p-6 bg-gray-100"
      >
        <h1 class="text-4xl font-semibold mb-4">
          Hey {{ user?.['firstName'] }} {{ user?.['lastName'] }}!
        </h1>
        <button
          class="bg-red-500 text-white text-xl px-4 py-2 mt-10 cursor-pointer rounded-md hover:bg-red-600"
          (click)="deleteAccount()"
        >
          Delete Account
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProfileComponent {
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);
  user: any = null;

  ngOnInit() {
    this.authService.getAuthUserInfo().subscribe({
      next: (response) => {
        this.user = response.body.data;
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message, errorType: 'User Info' },
        });
      },
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete your account?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.authService.deleteAccount().subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: error.message, errorType: 'Delete Account' },
            });
          },
        });
      }
    });
  }
}
