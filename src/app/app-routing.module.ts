import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NewUserComponent } from './components/new-user/new-user.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'panel',
    component: DashboardComponent,
    children: [
      /*{
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'users'
      },*/
      {
        path: 'usuarios',
        component: UserDashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'nuevo', 
        component: NewUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'modificar/:id',
        component: NewUserComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //enableTracing: true, 
    paramsInheritanceStrategy: 'always',
    //useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
