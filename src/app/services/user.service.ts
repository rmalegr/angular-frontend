import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private appURl: string;
  private apiURl: string;

  constructor(private http: HttpClient) {
    this.appURl = environment.endpoint
    this.apiURl = 'api/users/'
  }

  sigIng(user: User): Observable<any> {
    return this.http.post(`${this.appURl}${this.apiURl}`, user)
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.appURl}${this.apiURl}login`, user)
  }
}