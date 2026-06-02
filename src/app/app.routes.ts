import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Singup } from './singup/singup';
import { User } from './user/user';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'login', component: Login},
    {path: 'singup', component: Singup},
    {path: 'user', component: User},
];
