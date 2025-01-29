import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  passwordLengthValidator,
  passwordMatchValidator,
} from '../../utils/custom.form-validators';
import { FormFieldErrorComponent } from '../../components/form-field-error/form-field-error.component';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, FormFieldErrorComponent, RouterLink],
  template: `
    <main
      class="flex items-center justify-center w-screen h-screen bg-gray-200"
    >
      <form
        [formGroup]="signupForm"
        (ngSubmit)="onSubmit($event)"
        class="flex flex-col items-center w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <img src="logos/logo_purple.png" alt="Logo" class="w-80" />

        <h1 class="text-4xl font-extrabold text-gray-800">Sign Up</h1>

        <div class="flex items-center w-full gap-x-8">
          <div class="w-full">
            <div class="flex items-center justify-between">
              <label for="firstName" class="text-sm font-medium text-gray-600"
                >First Name</label
              >
              <app-form-field-error
                *ngIf="signupForm.controls.firstName.touched &&
                signupForm.controls.firstName.invalid &&
                signupForm.controls.firstName.errors?.['required']"
                message="First name is required"
              />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              formControlName="firstName"
              placeholder="Enter your first name"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
            />
          </div>

          <div class="w-full">
            <div class="flex items-center justify-between">
              <label for="lastName" class="text-sm font-medium text-gray-600"
                >Last Name</label
              >
              <app-form-field-error
                *ngIf="signupForm.controls.lastName.touched &&
                signupForm.controls.lastName.invalid &&
                signupForm.controls.lastName.errors?.['required']"
                message="Last name is required"
              />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              formControlName="lastName"
              placeholder="Enter your last name"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
            />
          </div>
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="email" class="text-sm font-medium text-gray-600"
              >Email Address</label
            >
            <app-form-field-error
              *ngIf="
                signupForm.controls.email.touched &&
                signupForm.controls.email.invalid &&
                signupForm.controls.email.errors?.['required']
              "
              message="Email is required"
            />
            <app-form-field-error
              *ngIf="
                signupForm.controls.email.touched &&
                signupForm.controls.email.invalid &&
                signupForm.controls.email.errors?.['email']
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
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          />
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="password" class="text-sm font-medium text-gray-600"
              >Password</label
            >
            <app-form-field-error
              *ngIf="
                signupForm.controls.password.touched &&
                signupForm.controls.password.invalid &&
                signupForm.controls.password.errors?.['required']
              "
              message="Password is required"
            />
            <app-form-field-error
              *ngIf="
                signupForm.controls.password.touched &&
                signupForm.controls.password.invalid &&
                signupForm.controls.password.errors?.['minlength']
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
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          />
          <p class="text-xs text-gray-500 mt-1">
            Note: Your password will be trimmed to remove leading and trailing
            spaces.
          </p>
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label
              for="passwordConfirm"
              class="text-sm font-medium text-gray-600"
              >Password Confirmation</label
            >
            <app-form-field-error
              *ngIf="
                signupForm.controls.passwordConfirm.touched &&
                signupForm.controls.passwordConfirm.invalid &&
                signupForm.controls.passwordConfirm.errors?.['required']
              "
              message="Password confirmation is required"
            />
            <app-form-field-error
              *ngIf="
                signupForm.controls.passwordConfirm.touched &&
                signupForm.controls.passwordConfirm.invalid &&
                signupForm.controls.passwordConfirm.errors?.['passwordMismatch']
              "
              message="Passwords do not match"
            />
          </div>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            formControlName="passwordConfirm"
            placeholder="Confirm your password"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          [disabled]="signupForm.invalid || isLoading()"
          class="flex items-center justify-center gap-x-4 w-full py-2 cursor-pointer disabled:cursor-not-allowed bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
        >
          Sign Up
          <div
            *ngIf="isLoading()"
            class="border-white/50 h-6 w-6 animate-spin rounded-full border-4 border-t-black/50"
          ></div>
        </button>

        <p class="text-sm text-gray-600">
          Already have an account?
          <a routerLink="/login" class="text-purple-600 hover:underline">Login</a>
        </p>
      </form>
    </main>
  `,
  styles: ``,
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  isLoading = signal(false);

  signupForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordLengthValidator(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  onSubmit(e: Event) {
    e.preventDefault();
    if (
      this.signupForm.valid &&
      this.signupForm.value.firstName &&
      this.signupForm.value.lastName &&
      this.signupForm.value.email &&
      this.signupForm.value.password &&
      this.signupForm.value.passwordConfirm
    ) {
      this.isLoading.set(true);

      try {
        this.authService
          .register(
            this.signupForm.value.firstName,
            this.signupForm.value.lastName,
            this.signupForm.value.email,
            this.signupForm.value.password.trim(),
            this.signupForm.value.passwordConfirm.trim()
          )
          .subscribe({
            error: (error: HttpErrorResponse) => {
              this.isLoading.set(false);
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error.message, errorType: 'Register' },
              });
            },
            complete: () => {
              this.isLoading.set(false);
              this.router.navigateByUrl('/login');
            },
          });
      } catch (error: any) {
        this.isLoading.set(false);
        if (error.message === 'Passwords do not match') {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: error.message, errorType: 'Register' },
          });
        }
      }
    }
  }
}
