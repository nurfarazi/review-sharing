import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { validationMessages, formErrors, validationConfig } from './review-form.validation';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  userForm: FormGroup;

  formErrors = formErrors;
  validationMessages = validationMessages;

  constructor(private fb: FormBuilder,
              private reviewSvc: ReviewService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group(validationConfig);

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }

    }
  }

  onSubmit() {
    this.reviewSvc.insert(this.userForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
