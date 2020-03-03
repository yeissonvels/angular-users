import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/interface'

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor() { }

  setUserLoggedIn(user:User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  isUserLoggedIn(): boolean {
    return this.getUserLoggedIn() != null ? true : false
  }

  getUserLoggedIn(): any {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
