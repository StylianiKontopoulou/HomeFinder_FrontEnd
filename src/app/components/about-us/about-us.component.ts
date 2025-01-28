import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-about-us',
  imports: [RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  userService = inject(UserService);
  user = this.userService.user;
}
