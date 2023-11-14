import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/index/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PAGES } from './shared/constants/index';
const routes: Routes = [
  {
    path: PAGES.INDEX,
    component: HomeComponent
  },
  {
    path: PAGES.AUTH,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: PAGES.ADMIN,
    loadChildren: () => 
      import('./features/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'employee',
    loadChildren: () => 
      import('./features/employee/employee.module').then((m) => m.EmployeeModule)
  },
  {
    path: 'shopping',
    loadChildren: () => 
      import('./features/shopping/shopping.module').then((m) => m.ShoppingModule)
  },
  {
    path: 'profile',
    loadChildren: () => 
      import('./features/user-profile/user-profile.module').then((m) => m.UserProfileModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
  
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
