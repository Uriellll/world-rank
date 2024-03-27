import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Login } from '../../models/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fB: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fB.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    const login: Login = {
      email: this.userControl?.getRawValue(),
      password: this.passwordControl?.getRawValue(),
    };
    this.authService.login(login).subscribe(
      (res: any) => {
        this.openSnackBar(`Bienvenido a World Ranks`);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.openSnackBar(error.error.error);
      }
    );
  }
  get userControl() {
    return this.loginForm.get('user');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  openSnackBar(text: string) {
    const data = { text };
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
      data: data,
    });
  }
}
