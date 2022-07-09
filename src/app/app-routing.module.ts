import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { 
    path: '',
    component: LoginComponent
  },
  {
    path: 'details/:n',
    component: DetailsComponent
  },
  {
    path: 'usr/:unit/pwd/:code',
    component: UsersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
