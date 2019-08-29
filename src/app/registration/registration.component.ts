import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  profileForm = this.fb.group({
    first_name: [''],
    last_name: [''],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],

  })
  constructor(private fb: FormBuilder, private adminservice: AdminService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    // console.log({users: this.profileForm.value})
    this.adminservice.registraion({user: this.profileForm.value})
      .subscribe(data => {
        this.router.navigate(['login']);
        this.profileForm.reset();
      });
  }

}
