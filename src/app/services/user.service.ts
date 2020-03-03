import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, HttpResponse, LoginResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  api_url = 'https://novedades.orange.es/ws/api/index.php'
  constructor(
    private _http: HttpClient
  ) { }

  login(username: string, password: string): Observable<LoginResponse> { 
    return this._http.post<LoginResponse>(`${this.api_url}`, {
      opt: 'auth',
      username: username,
      password: btoa(password)
    })
  }
  
  getUsers(): Observable<[User]> {
    return this._http.post<[User]>(`${this.api_url}`, {
      opt: '_getUsers'
    })
  }

  getUserData(id: string): Observable<User> {
    return this._http.post<User>(`${this.api_url}`, {
      opt: '_getUser',
      id: id,
    })
  }

  existUser(username: string): Observable<HttpResponse> {
    return this._http.post<HttpResponse>(`${this.api_url}`, {
      opt: '_existUser',
      username: username
    })
  }

  saveUser(username: string, password: string, email: string, id: string): Observable<HttpResponse> {
    return this._http.post<HttpResponse>(`${this.api_url}`, {
      opt: id != '0' ? '_updateUser' : '_saveUser',
      username: username,
      password: password,
      email: email,
      id: id,
    })
  }

  deleteUser(id: number): Observable<HttpResponse> {
    return this._http.post<HttpResponse>(`${this.api_url}`, {
      opt: '_deleteUser',
      id: id
    })
  }
}
