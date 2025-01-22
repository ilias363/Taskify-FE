import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  template: `
    <div class="flex items-center justify-center w-screen h-screen bg-gray-200">
      <form
        class="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <img src="logos/logo_purple.png" alt="Logo" class="w-72" />

        <h1 class="text-4xl font-extrabold text-gray-800">Login</h1>

        <div class="w-full">
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
            required
          />
        </div>

        <div class="w-full">
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple4 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
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
export class LoginComponent {}
