import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly ROLE_KEY = 'user_role';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, { ...user, role: 'user' });
  }


  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];

            const safeUser = {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              role: user.role || 'user',
            };

            localStorage.setItem(this.TOKEN_KEY, 'mock-token-' + user.id);
            localStorage.setItem(this.USER_KEY, JSON.stringify(safeUser));
            localStorage.setItem(this.ROLE_KEY, safeUser.role);

            return safeUser;
          } else {
            throw new Error('Invalid credentials');
          }
        })
      );
  }


  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }


  getUser(): any {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }


  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }


  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
