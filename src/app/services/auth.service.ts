import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(login: Login): Observable<any> {
    return this.http.post<Login>('https://reqres.in/api/login', login);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!!token) {
      return this.validateTokenString(token);
    }
    return false;
  }
  validateTokenString(str: string): boolean {
    let minuscCount = 0;
    let mayuscCount = 0;
    for (let char of str) {
      if (char >= 'a' && char <= 'z') {
        minuscCount++;
      } else if (char >= 'A' && char <= 'Z') {
        mayuscCount++;
      }
    }
    return minuscCount === 9 && mayuscCount === 4;
  }
  logout():void{
    localStorage.removeItem('token');
  }
}
