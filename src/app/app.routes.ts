import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Singup } from './singup/singup';
import { User } from './user/user';
import { Cart } from './cart/cart';
import { Details } from './details/details';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'login', component: Login},
    {path: 'singup', component: Singup},
    {path: 'user', component: User},
    {path: 'cart', component: Cart},
    {path: 'details', component: Details}
];
