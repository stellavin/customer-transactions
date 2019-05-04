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
  component: DepositsComponent
},
{
  path: 'settings',
  component: SettingsComponent
},
{
  path: 'login',
  component: DepositsComponent

},
{
  path: 'register',
  component: RegisterComponent
},

{
  path: 'withdrawals',
  component: WithdrawalsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
