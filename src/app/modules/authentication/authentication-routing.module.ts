import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureInnerPagesGuard } from 'src/app/common/guard/secure-inner-pages.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
