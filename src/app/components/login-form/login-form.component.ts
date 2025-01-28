import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LoginForm } from 'src/app/shared/interfaces/login-form';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  userService = inject(UserService);
  router = inject(Router);

  form = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  onSubmit(value: any) {
    const user = this.form.value as LoginForm;
    delete user['confirmPassword'];

    this.userService.loginUser(user).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem(
          'authorizationHeader',
          btoa(`${user.userName}:${user.password}`),
        );
        this.userService.user.set(response);
        this.router.navigate(['my-properties']);
      },
      error: (response) => {
        console.log('Login error ', response);
      },
    });
  }

}
