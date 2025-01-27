import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { FileNotFoundComponent } from './components/file-not-found/file-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
  {
    path: 'property-form',
    component: PropertyFormComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'my-properties',
    component: MyPropertiesComponent,
    pathMatch: 'full',
  },
  {
    path: 'my-properties/:id',
    component: PropertyFormComponent,
  },
  {
    path: 'profile/:id',
    component: SignupComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: FileNotFoundComponent,
  },
];
