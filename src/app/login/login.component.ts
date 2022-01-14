import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { UserModel } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: any = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    let authFlow = this.auth
      .login(this.loginUser)
      .pipe(switchMap(() => this.auth.profile()));

    authFlow.subscribe({
      next: (user: UserModel) => {
        this.auth.saveUserToLocalStorage(user);
        this.router.navigate(['/dashboard']);
        console.log(user);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
