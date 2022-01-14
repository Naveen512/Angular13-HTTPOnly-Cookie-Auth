import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/liked-movies', {
      withCredentials: true,
    });
  }
}
