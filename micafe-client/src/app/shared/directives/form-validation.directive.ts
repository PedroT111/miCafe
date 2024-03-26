import { Directive, HostBinding, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective {

  @Input() fieldName!: string;
  @Input() form!: FormGroup;

  constructor() {}

  ngOnInit() {
    if (!this.form || !(this.form instanceof FormGroup)) {
      throw new Error('appFormValidation directive requires a valid FormGroup instance.');
    }
  }

  @HostBinding('class.is-invalid')
  get invalidClass() {
    const control: FormControl = this.form.get(this.fieldName) as FormControl;
    return control?.invalid && control?.touched;
  }

  

}
