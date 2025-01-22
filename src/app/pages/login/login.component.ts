import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex items-center justify-center w-screen h-screen bg-gray-200">
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
        class="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <img src="logos/logo_purple.png" alt="Logo" class="w-72" />

        <h1 class="text-4xl font-extrabold text-gray-800">Login</h1>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="email" class="text-sm font-medium text-gray-600"
              >Email Address</label
            >
            @if (loginForm.controls.email.touched &&
            loginForm.controls.email.invalid){
            <small class="text-xs font-medium mr-2 text-red-500">
              @if (loginForm.controls.email.errors?.['required']) {
              <span>Email is required</span>
              } @if (loginForm.controls.email.errors?.['email']) {
              <span>Invalid email format</span>
              }
            </small>
            }
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
            @if (loginForm.controls.password.touched &&
            loginForm.controls.password.invalid){
            <small class="text-xs font-medium mr-2 text-red-500">
              @if (loginForm.controls.password.errors?.['required']) {
              <span>Password is required</span>
              } @if (loginForm.controls.password.errors?.['minlength']) {
              <span>Password must be at least 6 characters long</span>
              }
            </small>
            }
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
          class="w-full py-2 bg-purple3 text-white rounded-lg font-semibold hover:bg-purple2 focus:outline-none focus:ring-2 focus:ring-purple4"
        >
          Login
        </button>

        <p class="text-sm text-gray-600">
          Don't have an account?
          <a href="#" class="text-purple3 hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
    }
  }
}
