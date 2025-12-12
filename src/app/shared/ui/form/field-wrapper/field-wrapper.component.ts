import { Component, computed, input } from '@angular/core';
import { Message } from "primeng/message";

@Component({
  selector: 'app-field-wrapper',
  imports: [Message],
  templateUrl: './field-wrapper.component.html',
  styleUrl: './field-wrapper.component.scss',
})
export class FieldWrapperComponent {
  fieldErrors = input<Record<string, unknown> | null>(null);
  fieldIsTouched = input<boolean>(false);

    errorMessage = computed(() => {
    if(!this.fieldIsTouched()){
      return '';
    }
    if(this.fieldErrors()?.hasOwnProperty('required')){
      return "Can't be empty";
    }
    if(this.fieldErrors()?.hasOwnProperty('maxlength')){
      return 'Max length exceeded';
    }
    return '';
  })
}
