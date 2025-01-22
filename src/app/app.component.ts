import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from "./pages/signup/signup.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  template: `
    <app-login />
    <!-- <app-signup /> -->
  `,
  styles: [],
})
export class AppComponent {
  title = 'Taskify-FE';
}
