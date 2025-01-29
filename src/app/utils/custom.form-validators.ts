import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (password && passwordConfirm) {
    if (password.value.trim() !== passwordConfirm.value.trim()) {
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

export function deadlineAfterStartDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const startDate = control.get('startDate');
  const deadline = control.get('deadline');

  if (startDate && deadline) {
    if (new Date(startDate.value) >= new Date(deadline.value)) {
      deadline.setErrors({ deadlineAfterStartDate: true });
      return { deadlineAfterStartDate: true };
    }
    deadline.setErrors(null);
  }
  return null;
}
