import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
