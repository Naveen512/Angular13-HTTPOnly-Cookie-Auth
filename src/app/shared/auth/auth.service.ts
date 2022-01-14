import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    phone: '',
  });

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post('http://localhost:3000/auth/login', user, {
      withCredentials: true,
    });
  }

  profile(): Observable<UserModel> {
    return this.http.get<UserModel>('http://localhost:3000/user-profile', {
      withCredentials: true,
    });
  }

  refreshCookie() {
    return this.http.get('http://localhost:3000/refresh-token', {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.get('http://localhost:3000/logout', { withCredentials: true });
  }

  saveUserToLocalStorage(user: UserModel) {
    this.userProfile.next(user);
    localStorage.setItem('user-profile', JSON.stringify(user));
  }

  loadUserFromLocalStorage(): UserModel {
    if (this.userProfile.value.id == 0) {
      let fromLocalStorage = localStorage.getItem('user-profile');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }
}
