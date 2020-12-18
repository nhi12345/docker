import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user: UserModel;

  private baseUrlFake = environment.baseURlFake;
  // private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public get isLoggedIn(): boolean {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user != null;
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.baseUrlFake + 'login', { email, password }).pipe(
      map((result: any) => {
        if (result.status === 'SUCCESS') {
          this.handleLoginLogout(result.user);
        }
        return result;
      })
    );
  }

  public logout(): void {
    localStorage.setItem('user', null);
    this.router.navigate(['auth/login']);
  }

  private handleLoginLogout(user?: UserModel): void {
    if (user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/dashboard']);
    } else {
      localStorage.setItem('user', null);
      this.router.navigate(['auth/login']);
    }
  }
}
