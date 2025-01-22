import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../custom.validators';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex items-center justify-center w-screen h-screen bg-gray-200">
      <form
        [formGroup]="signupForm"
        (ngSubmit)="onSubmit()"
        class="flex flex-col items-center w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <img src="logos/logo_purple.png" alt="Logo" class="w-72" />

        <h1 class="text-4xl font-extrabold text-gray-800">Sign Up</h1>

        <div class="flex items-center w-full gap-x-8">
          <div class="w-full">
            <div class="flex items-center justify-between">
              <label for="firstName" class="text-sm font-medium text-gray-600"
                >First Name</label
              >
              @if (signupForm.controls.firstName.touched &&
              signupForm.controls.firstName.invalid &&
              signupForm.controls.firstName.errors?.['required']){
              <span class="text-xs font-medium mr-2 text-red-500"
                >First name is required</span
              >
              }
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              formControlName="firstName"
              placeholder="Enter your first name"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
            />
          </div>

          <div class="w-full">
            <div class="flex items-center justify-between">
              <label for="lastName" class="text-sm font-medium text-gray-600"
                >Last Name</label
              >
              @if (signupForm.controls.lastName.touched &&
              signupForm.controls.lastName.invalid &&
              signupForm.controls.lastName.errors?.['required']){
              <small class="text-xs font-medium mr-2 text-red-500"
                >Last name is required</small
              >
              }
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              formControlName="lastName"
              placeholder="Enter your last name"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
            />
          </div>
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label for="email" class="text-sm font-medium text-gray-600"
              >Email Address</label
            >
            @if (signupForm.controls.email.touched &&
            signupForm.controls.email.invalid){
            <small class="text-xs font-medium mr-2 text-red-500">
              @if (signupForm.controls.email.errors?.['required']) {
              <span>Email is required</span>
              } @else if (signupForm.controls.email.errors?.['email']) {
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
            @if (signupForm.controls.password.touched &&
            signupForm.controls.password.invalid){
            <small class="text-xs font-medium mr-2 text-red-500">
              @if (signupForm.controls.password.errors?.['required']) {
              <span>Password is required</span>
              } @else if (signupForm.controls.password.errors?.['minlength']) {
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

        <div class="w-full">
          <div class="flex items-center justify-between">
            <label
              for="passwordConfirm"
              class="text-sm font-medium text-gray-600"
              >Password Confirmation</label
            >
            @if (signupForm.controls.passwordConfirm.touched &&
            signupForm.controls.passwordConfirm.invalid){
            <small class="text-xs font-medium mr-2 text-red-500">
              @if (signupForm.controls.passwordConfirm.errors?.['required']) {
              <span>Password confirmation is required</span>
              } @else if
              (signupForm.controls.passwordConfirm.errors?.['passwordMismatch'])
              {
              <span>Passwords do not match</span>
              }
            </small>
            }
          </div>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            formControlName="passwordConfirm"
            placeholder="Confirm your password"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          [disabled]="signupForm.invalid"
          class="w-full py-2 bg-purple3 text-white rounded-lg font-semibold hover:bg-purple2 focus:outline-none focus:ring-2 focus:ring-purple4"
        >
          Sign Up
        </button>

        <p class="text-sm text-gray-600">
          Already have an account?
          <a href="#" class="text-purple3 hover:underline">Login</a>
        </p>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);

  signupForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted:', this.signupForm.value);
    }
  }
}
