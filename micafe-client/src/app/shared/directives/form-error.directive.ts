/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef,Input,} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appFormError]'
})
export class FormErrorDirective /*implements DoCheck*/{
  @Input() control!: AbstractControl | null;

  constructor(private element: ElementRef) { }

  private controlErrors: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: 'The password must contain at least 8 characters.',
    emailExisting: 'The entered email is already registered.',
    min: 'Please enter a higher value.',
    maxlength: 'The entered text exceeds the maximum allowed length',
    mismatch: 'The passwords must match.'
  }


  private updateView(errors: ValidationErrors | null | undefined) {
    if (errors) {
      Object.keys(errors).forEach(errorKey => {
        const errorMessage = this.controlErrors[errorKey];
        if(errorMessage){
          this.element.nativeElement.textContent = errorMessage;
        } else {
          this.element.nativeElement.textContent = '';
          this.element.nativeElement.style.display = 'none';
        }
      })
    }
  }

  ngOnInit() {
    if (this.control) {
      this.updateView(this.control?.errors);
      this.control.statusChanges.subscribe(() => {
        this.updateView(this.control?.errors);
      });
    }
  }
  
  
}

  
