import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private logged: boolean
  constructor(
    private _data: DataService,
    private _router: Router,

  ) {
    this.logged = _data.isUserLoggedIn();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.logged) {
      alert('No tienes permiso para acceder')
      this._router.navigate(['/login']) 
    } 

    return  this.logged
  }
  
}
