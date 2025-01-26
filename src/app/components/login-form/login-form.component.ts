import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/shared/interfaces/login-form';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  userService = inject(UserService);
  router = inject(Router);

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

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
        const message = response.error.msg;
        console.log('Login error ', message);
        this.registrationStatus = { success: false, message };
      },
    });
  }

  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }
}
