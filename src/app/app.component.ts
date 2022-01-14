import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userInfo?: UserModel;
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });
  }
  title = 'ang13-jwt-httponlycookie-learning';

  logOut() {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.userProfile.next({
          email: '',
          firstName: '',
          id: 0,
          lastName: '',
          phone: '',
        });
        localStorage.removeItem('user-profile');
        this.router.navigate(['/']);
      },
    });
  }
}
