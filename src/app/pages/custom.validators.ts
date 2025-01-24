import { AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (password && passwordConfirm) {
    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    passwordConfirm.setErrors(null);
  }
  return null;
}

export function passwordLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    }

    const trimmedValue = control.value.trim();

    if (trimmedValue.length < minLength) {
      return { minlength: true };
    }

    return null;
  };
}
