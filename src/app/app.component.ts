import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from "./pages/signup/signup.component";

@Component({
  selector: 'app-root',
  imports: [SignupComponent],
  template: `
    <app-signup />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Taskify-FE';
}
