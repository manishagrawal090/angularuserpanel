import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef,
    private fb: FormBuilder, private adminservice: AdminService, private router: Router) { }

  editForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    file: [null]
  })
  ngOnInit() {
    this.getprofile();
  }
  logout() {
    let token = JSON.parse(localStorage.getItem('auth_token'))
    // console.log({ token: token })
    this.adminservice.logout({ token: token })
      .subscribe(data => {
        this.router.navigate(['login']);
        localStorage.clear();
      },
    );
  }
  user;
  getprofile() {
    this.adminservice.profile()
      .subscribe(data => {
        this.user = data.data
        // console.log(this.user)
      },
    );
  }
  editEmp(user) {
    document.getElementById("myForm").style.display = "block";
    this.editForm.setValue({
      first_name: user.first_name,
      last_name: user.last_name,
      file: '',
    });
  }
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  onupdate() {
    // console.log({user: {first_name: this.editForm.value.first_name,last_name:this.editForm.value.last_name,avatar: this.editForm.value.file}})
    this.adminservice.update({user: {first_name: this.editForm.value.first_name,last_name:this.editForm.value.last_name,avatar: this.editForm.value.file}})
      .subscribe(data => {
        if (data.success == true){
          this.editForm.reset();
          this.closeForm();
          this.getprofile();
        }
        else{
          alert(data.message)
        }   
      },
    );
  }
 
  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.editForm.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
