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
import { NgbDropdownModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { SplitWordsPipe } from './pipes/split-words.pipe';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { TopNavbarMobileComponent } from './components/top-navbar-mobile/top-navbar-mobile.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FormValidationDirective,
    FormErrorDirective,
    FilterComponent,
    SearchComponent,
    TruncateTextPipe,
    SplitWordsPipe,
    NavbarMobileComponent,
    TopNavbarMobileComponent,
    TitlePageComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    NgbOffcanvasModule
  ],
  exports: [
    NavbarComponent,
    NavbarMobileComponent,
    TopNavbarMobileComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormValidationDirective,
    FormErrorDirective,
    FilterComponent,
    SearchComponent,
    TruncateTextPipe,
    SplitWordsPipe, 
    TitlePageComponent,
    DateFormatPipe
  ]
})
export class SharedModule { }
