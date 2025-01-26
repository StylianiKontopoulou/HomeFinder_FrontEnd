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
    console.log(value);
    // this.userService.allUsers().subscribe({
    //   next: (response) => {
    //     console.log('allUsers response', response.msg);
    //   },
    //   error: (response) => {
    //     const message = response.error.msg;
    //     console.log('Error', message);
    //   },
    // });

    const user = this.form.value as LoginForm;
    delete user['confirmPassword'];

    this.userService.loginUser(user).subscribe({
      next: (response: any) => {
        console.log('User registered', response);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem(
          'authorizationHeader',
          btoa(`${user.userName}:${user.password}`),
        );
        //localStorage.setItem('userId', response.id);
        //localStorage.setItem('userType', response.userType);
        this.userService.user.set(response);
        this.registrationStatus = { success: true, message: response.msg };
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Error registering user', message);
        this.registrationStatus = { success: false, message };
      },
    });
  }

  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }
}
