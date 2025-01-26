import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  template: `
    <main class="grid min-h-full place-items-center bg-white px-6 py-24">
      <div class="text-center">
        <p class="text-xl font-semibold text-purple2">404</p>
        <h1
          class="mt-4 text-7xl font-semibold tracking-tight text-balance text-gray-900"
        >
          Page not found
        </h1>
        <p class="mt-6 text-xl font-medium text-pretty text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            routerLink="/dashboard"
            class="rounded-md bg-purple2 px-3.5 py-2.5 text-base text-white shadow-xs hover:bg-purple3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple2"
            >Go back home</a
          >
        </div>
      </div>
    </main>
  `,
  styles: ``,
})
export class PageNotFoundComponent {}
