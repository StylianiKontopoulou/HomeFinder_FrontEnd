import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginForm } from 'src/app/shared/interfaces/login-form';
import { UpdateUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  userService = inject(UserService);
  isEditMode: boolean = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  
  form = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{4,20}$/,
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    this.passwordConfirmValidator,
  );
  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    if (!!userId) {
      this.isEditMode = true;
      this.userService.getUser(+userId).subscribe({
        next: (response) => {
          this.form.patchValue({
            firstName: response.firstName.toString(),
            lastName: response.lastName.toString(),
            userName: response.userName,
            email: response.email,
            password: response.password.toString(),
            phoneNumber: response.phoneNumber.toString(),
          });
        },
        error: (response) => {
          const message = response.error.msg;
          console.log('Error getting user', message);
        },
      });
    }
  }

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  onSubmit(value: any) {
    if (this.form.valid) {
      let userId = this.route.snapshot.paramMap.get('id');
      const updateUser = {
        ...(this.form.value as unknown as UpdateUser),
        id: +userId,
      };

      delete updateUser.confirmPassword;

      // Edit user's profile
      if (this.isEditMode) {
        this.userService.updateUser(updateUser).subscribe({
          next: (response) => {
            localStorage.setItem('user', JSON.stringify(updateUser));
            localStorage.setItem(
              'authorizationHeader',
              btoa(`${updateUser.userName}:${updateUser.password}`),
            );
            this.userService.user.set(updateUser);

            this.router.navigate(['home']);
          },
          error: (response) => {
            this.snackBar.open(response.error, 'Close', {
              duration: 3000,
              panelClass: ['error-toast'],
            });
          },
        });
      } else {
        const user = this.form.value as LoginForm;
        delete user['confirmPassword'];

        this.userService.registerUser(user).subscribe({
          next: (response) => {
            this.router.navigate(['login']);
          },
          error: (response) => {
            this.snackBar.open(response.error, 'Close', {
              duration: 3000,
              panelClass: ['error-toast'],
            });
          },
        });
      }
    }
  }
}
