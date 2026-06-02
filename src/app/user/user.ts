import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { Alerts } from '../alertss';
import { ToyModel } from '../../models/toy.model';
import { ToyService } from '../../services/toy.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { Utils } from '../utils';

@Component({
  selector: 'app-user',
//  standalone: true, // Explicitly ensure standalone mode is on
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    RouterLink,
    MatFormFieldModule,
    MatOptionModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  public activeUser = AuthService.getActiveUser();
  recommended = signal<ToyModel[]>([]);
  types = signal<{ Typeid: number; name: string; description: string }[]>([]);

  oldPassword = '';
  newPassword = '';
  passRepeat = '';

  constructor(private router: Router, public utils: Utils) {
    if (!this.activeUser) {
      this.router.navigate(['/login']);
      return
    }
      ToyService.getTypes()
      .then(rsp => this.types.set(rsp.data))

  }

  ngOnInit() {
      if (this.activeUser) {
      ToyService.getTypes()
        .then(rsp => this.types.set(rsp.data))
        .catch(err => console.error('Failed to load toy types', err));
    }
  }

  getAvatarUrl() {
    return `https://ui-avatars.com/api/?name=${this.activeUser?.firstName}+${this.activeUser?.lastName}`;
  }

  updateUser() {
    if (!this.activeUser) return;
    
    Alerts.confirm('Are you sure you want to update user info?', () => {
      AuthService.updateActiveUser(this.activeUser!);
      Alerts.success('User updated successfully');
    });
  }

  updatePassword() {
    if (!this.activeUser) return;

    Alerts.confirm('Are you sure you want to change the password?', () => {
      if (this.oldPassword !== this.activeUser?.password) {
        Alerts.error('Invalid old password');
        return;
      }

      if (this.newPassword.length < 6) {
        Alerts.error('Password must be at least 6 characters long');
        return;
      }

      if (this.newPassword !== this.passRepeat) {
        Alerts.error('Passwords dont match');
        return;
      }

      if (this.newPassword === this.activeUser?.password) {
        Alerts.error('New password cant be the same as the old one');
        return;
      }

      AuthService.updateActiveUserPassword(this.newPassword);
      Alerts.success('Password updated successfully');
      AuthService.logout();
      this.router.navigate(['/login']);
    });
  }
}