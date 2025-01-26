import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormFieldErrorComponent } from '../../components/form-field-error/form-field-error.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { passwordLengthValidator } from '../custom.form-validators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, FormFieldErrorComponent, RouterLink],
  template: `
    <main
      class="flex items-center justify-center w-screen h-screen bg-gray-200"
    >
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit($event)"
        class="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <img src="logos/logo_purple.png" alt="Logo" class="w-80" />

        <h1 class="text-4xl font-extrabold text-gray-800">Login</h1>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="email" class="text-sm font-medium text-gray-600"
              >Email Address</label
            >
            <app-form-field-error
              *ngIf="
                loginForm.controls.email.touched &&
                loginForm.controls.email.invalid &&
                loginForm.controls.email.errors?.['required']
              "
              message="Email is required"
            />
            <app-form-field-error
              *ngIf="
                loginForm.controls.email.touched &&
                loginForm.controls.email.invalid &&
                loginForm.controls.email.errors?.['email']
              "
              message="Invalid email format"
            />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            formControlName="email"
            placeholder="Enter your email"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
          />
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="password" class="text-sm font-medium text-gray-600"
              >Password</label
            >
            <app-form-field-error
              *ngIf="
                loginForm.controls.password.touched &&
                loginForm.controls.password.invalid &&
                loginForm.controls.password.errors?.['required']
              "
              message="Password is required"
            />
            <app-form-field-error
              *ngIf="
                loginForm.controls.password.touched &&
                loginForm.controls.password.invalid &&
                loginForm.controls.password.errors?.['minlength']
              "
              message="Password must be at least 6 characters long"
            />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            formControlName="password"
            placeholder="Enter your password"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
          />
          <p class="text-xs text-gray-500 mt-1">
            Note: Your password will be trimmed to remove leading and trailing
            spaces.
          </p>
        </div>
        <button
          type="submit"
          [disabled]="loginForm.invalid || isLoading()"
          class="flex items-center justify-center gap-x-4 w-full py-2 bg-purple3 text-white rounded-lg font-semibold hover:bg-purple2 focus:outline-none focus:ring-2 focus:ring-purple4"
        >
          Login
          <div
            *ngIf="isLoading()"
            class="border-black border-opacity-50 h-6 w-6 animate-spin rounded-full border-4 border-t-white"
          ></div>
        </button>

        <p class="text-sm text-gray-600">
          Don't have an account?
          <a routerLink="/signup" class="text-purple3 hover:underline"
            >Sign Up</a
          >
        </p>
      </form>
    </main>
  `,
  styles: ``,
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  isLoading = signal(false);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordLengthValidator(6)]],
  });

  onSubmit(e: Event) {
    e.preventDefault();
    if (
      this.loginForm.valid &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      this.isLoading.set(true);

      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password.trim())
        .subscribe({
          error: (error: HttpErrorResponse) => {
            this.isLoading.set(false);
            this.dialog.open(ErrorDialogComponent, {
              data: { message: error.error.message, errorType: 'Login' },
            });
          },
          complete: () => {
            this.isLoading.set(false);
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || [
              '/',
            ];
            this.router.navigate(returnUrl);
          },
        });
    }
  }
}
