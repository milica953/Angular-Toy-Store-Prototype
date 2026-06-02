import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/user.models';
import { Alerts } from '../alertss';
import { AuthService } from '../../services/auth.services';
import { ToyService } from '../../services/toy.service';

@Component({
  selector: 'app-singup',
  imports: [

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterLink,
    MatSelectModule
    
  ],
  templateUrl: './singup.html',
  styleUrl: './singup.css',
})
export class Singup {
  user: Partial<UserModel> = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    favorite_toy: ''
  }

  repeat: string = ''
  types = signal<any[]>([]);

  constructor(public router: Router) {
    ToyService.getTypes()
      .then(rsp => this.types.set(rsp.data))
  }

  doSignup() {
    if (AuthService.existsByEmail(this.user.email!)) {
      Alerts.error('Email already registred!')
      return
    }

    if (this.user.firstName == '' || this.user.lastName == '' || this.user.address == '' || this.user.favorite_toy == '' || this.user.phone == '') {
      Alerts.error('All fields should have a value!')
      return
    }

    if (this.user.password!.length < 6) {
      Alerts.error('Password must be at least 6 chars long!')
      return
    }

    if (this.user.password !== this.repeat) {
      Alerts.error('Passwords dont match!')
      return
    }

    console.log(this.user)
    AuthService.createUser(this.user)
    this.router.navigate(['/login'])
  }
}
