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
    required: 'Campo obligatorio',
    email: 'Ingrese un email válido',
    minlength: 'Mínimo 8 caracteres',
    emailExisting: 'El email ingresado ya está registrado',
    min: 'Ingrese un valor mayor'
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

  
