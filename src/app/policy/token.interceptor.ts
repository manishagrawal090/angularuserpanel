import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AdminService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = JSON.parse(localStorage.getItem('auth_token'))
    // console.log('Bearer + token')
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    // request = request.clone({headers: request.headers.set('Authorization', token)});

    return next.handle(request);
  }
}