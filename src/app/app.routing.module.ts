import { AuthGuard } from './pages/_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DepositsComponent } from './pages/deposits/deposits.component';
import { WithdrawalsComponent } from './pages/withdrawals/withdrawals.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
},
{
  path: '',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'deposits',
  component: DepositsComponent,
  canActivate: [AuthGuard]

},
{
  path: 'withdrawals',
  component: WithdrawalsComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

