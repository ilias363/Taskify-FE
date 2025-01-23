import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-red-500">404</h1>
        <p class="text-2xl font-medium text-gray-800 mt-4">Page Not Found</p>
        <p class="text-gray-600 mt-2">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <a
          routerLink="/"
          class="inline-block mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-medium transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class PageNotFoundComponent {}
