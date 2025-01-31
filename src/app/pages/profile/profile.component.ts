import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  template: `
    <app-header />
    <div class="container mx-auto p-4">
      <h1 class="text-4xl font-bold mb-4">Profile</h1>
    </div>
  `,
  styles: ``
})
export class ProfileComponent {
  authService = inject(AuthService);
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

  editProfile() {
    alert('Edit profile functionality to be implemented.');
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      alert('Delete account functionality to be implemented.');
    }
  }
}
