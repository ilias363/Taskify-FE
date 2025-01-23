import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ApiTestComponent } from './components/api-test/api-test.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Taskify-FE';
}
