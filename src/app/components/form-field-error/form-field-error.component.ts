import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  imports: [],
  template: `
    <span class="text-xs font-medium mr-2 block text-red-500"
    >{{ message() }}</span>
  `,
  styles: ``,
})
export class FormFieldErrorComponent {
  message = input.required<string>();
}
