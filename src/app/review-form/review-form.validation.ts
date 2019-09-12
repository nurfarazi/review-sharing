import { Validators } from '@angular/forms';

export const validationMessages = {
  'body': {
    'required': 'is required.',
    'minlength': 'Must be at least 1 characters long.',
    'maxlength': 'Cannot be more than 300 characters long.'
  }
};

export const formErrors = {
  'body': ''
};

export const validationConfig = {
  'body': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
};
