import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { FormValidationDirective } from './directives/form-validation.directive';
import { FormErrorDirective } from './directives/form-error.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FormValidationDirective,
    FormErrorDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormValidationDirective,
    FormErrorDirective
  ]
})
export class SharedModule { }
