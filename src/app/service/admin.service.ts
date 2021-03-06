import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://fast-chamber-74548.herokuapp.com/api/v1';  
  
  login(data){
    return this.http.post<any>(this.baseUrl+'/oauth/token',data);  
  }
  logout(data){
    return this.http.post<any>(this.baseUrl+'/oauth/revoke',data);  
  }
  profile(){
    return this.http.get<any>(this.baseUrl+'/users/profile');
  }
  registraion(data){
    return this.http.post<any>(this.baseUrl+'/users',data);  
  }
  update(data){
    return this.http.put<any>(this.baseUrl+'/users/profile',data);  
  }
}
