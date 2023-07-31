import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent,
    SideNavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
