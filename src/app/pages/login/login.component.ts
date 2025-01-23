import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormFieldErrorComponent } from '../../components/form-field-error/form-field-error.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, FormFieldErrorComponent, RouterLink],
  template: `
    <div class="flex items-center justify-center w-screen h-screen bg-gray-200">
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit($event)"
        class="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <img src="logos/logo_purple.png" alt="Logo" class="w-72" />

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
        </div>
        <button
          type="submit"
          [disabled]="loginForm.invalid"
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
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  isLoading = signal(false);

  loginForm = this.formBuilder.group({
    email: ['ilias@gmail.co', [Validators.required, Validators.email]],
    password: ['rootroot', [Validators.required, Validators.minLength(6)]],
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
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Login success:', response);
          },
          error: (error: HttpErrorResponse) => {
            console.log('Error:', error);
            alert(error.error.message);
            this.isLoading.set(false);
          },
          complete: () => {
            console.log('Complete');

            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
            this.isLoading.set(false);
          },
        });

    }
  }
}
