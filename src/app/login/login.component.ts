import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  profileForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private adminservice: AdminService, private router: Router) { }

  ngOnInit() {
    localStorage.clear();
  }
  onSubmit() {
    this.adminservice.login({email: this.profileForm.value.email,password: this.profileForm.value.password,grant_type: "password"})
      .subscribe(data => {
        if (data.access_token){
          this.router.navigate(['user']);
          localStorage.setItem('auth_token', JSON.stringify(data.access_token));
          this.profileForm.reset();
        }
        else{
          alert(data.message)
        }
      },
    );
  }

}
