import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
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
  },
  {
    path: 'usr/:unit/pwd/:code/newuser',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
