import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormValidationDirective } from './directives/form-validation.directive';
import { FormErrorDirective } from './directives/form-error.directive';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SplitWordsPipe } from './pipes/split-words.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FormValidationDirective,
    FormErrorDirective,
    FilterComponent,
    SearchComponent,
    TruncateTextPipe,
    SpinnerComponent,
    SplitWordsPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormValidationDirective,
    FormErrorDirective,
    FilterComponent,
    SearchComponent,
    TruncateTextPipe,
    SplitWordsPipe, 
  ]
})
export class SharedModule { }
