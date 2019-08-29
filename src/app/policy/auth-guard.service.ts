import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _authService: AdminService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('auth_token')

    console.log("=================================",token)
    if (token) {
        return true;
    }
    this.router.navigate(['/admin']);

    // navigate to login page
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}