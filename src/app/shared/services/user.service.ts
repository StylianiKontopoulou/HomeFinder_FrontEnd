import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { retry, catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoggedInUser } from '../interfaces/user';
import AuthHeaders from '../helpers/authHeaders';


const API_URL = `${environment.apiURL}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  user = signal<any | null>(null);

  constructor() {
    let storedUser = localStorage.getItem('user');
    if (storedUser){
      this.user.set(JSON.parse(storedUser));
    }
  }
  
  getUser(userId: any): Observable<any> {
    const headers = AuthHeaders.createAuthorizationHeader();
    return this.http.get(`${API_URL}/${userId}`, { headers });
  }

  registerUser(user: LoginForm) {
    const headers = AuthHeaders.createAuthorizationHeader();
    return this.http.post<{ msg: string }>(`${API_URL}/register`, user, {headers});
  }

  logoutUser() {
    this.user.set(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  loginUser(data: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post(`${API_URL}/login`, JSON.stringify(data), { headers }).pipe(
      retry(1),
      catchError((error) => throwError(() => 'Something is wrong...'))
    );

    
    // const headers = this.createAuthorizationHeader();
    // return this.http.post<{ msg: string }>(`${API_URL}/login`, user, {headers});
  }

  // ONLY FOR ADMIN
  // allUsers() {
  //   const headers = this.createAuthorizationHeader();
  //   return this.http.get<{ msg: string}>(`${environment.apiURL}/admin/users`, {headers});
  // }

 
}