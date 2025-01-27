import { Component, Input, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { UpdateUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavbarComponent {
  userService = inject(UserService);
  user = this.userService.user;
  router = inject(Router);


  logout() {
    this.userService.logoutUser();
  }

  updateUserProfile() {
    const currentUser = this.user(); 
    this.router.navigate(['profile', currentUser.id]);
  }
}
