import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./components/authentication/authentication.module').then(m=> m.AuthenticationModule)
  }
  ,
  {
    path:'product-list',
    loadChildren:()=> import('./components/products/products.module').then(m=> m.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    loadChildren:()=> import('./components/authentication/authentication.module').then(m=> m.AuthenticationModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
