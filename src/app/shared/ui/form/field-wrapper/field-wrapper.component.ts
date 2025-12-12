import { Component, computed, input } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { Message } from "primeng/message";

@Component({
  selector: 'app-field-wrapper',
  imports: [Message],
  templateUrl: './field-wrapper.component.html',
  styleUrl: './field-wrapper.component.scss',
})
export class FieldWrapperComponent {
  fieldErrors = input<Record<string, unknown> | null>(null);
  signalFormErrors = input<ValidationError[]>([]);
  canShowError = input<boolean>(false);

  defaultErrorMessages = {
    required: "Can't be empty",
    maxlength: 'Max length exceeded',
    email: 'Invalid email address'
  }

  errorMessage = computed(() => {
    if(!this.canShowError()){
      return '';
    }
    if(this.fieldErrors()?.hasOwnProperty('required')){
      return this.defaultErrorMessages.required;
    }
    if(this.fieldErrors()?.hasOwnProperty('maxlength')){
      return this.defaultErrorMessages.maxlength;
    }
    if(this.fieldErrors()?.hasOwnProperty('email')){
      return this.defaultErrorMessages.email;
    }
    return '';
  })

  signalFormErrorMessage = computed(() => {
    if(!this.canShowError()){
      return '';
    }
    if(this.signalFormErrors().length > 0){
      const firstError = this.signalFormErrors()[0];
      if(firstError.kind === 'required'){
        return firstError.message ?? this.defaultErrorMessages.required;
      }
      if(firstError.kind === 'maxlength'){
        return firstError.message ?? this.defaultErrorMessages.maxlength;
      }
      if(firstError.kind === 'email'){
        return firstError.message ?? this.defaultErrorMessages.email;
      }
    }
    return '';
  })
}
