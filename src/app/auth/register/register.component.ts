import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  hide = true;
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
 //   private router: Router,
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:    ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname:  ['', Validators.compose([Validators.required])]
    });
  }
  submit():void{
    console.log(this.registerForm.value);
    this.authService.register({
      username: this.registerForm.value.username, // name of the field
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      email: this.registerForm.value.email,
      firstname : this.registerForm.value.firstname,
      lastname : this.registerForm.value.lastname
    }).subscribe({

     next: (v) => console.log(v),
     error: (error) => {
                     console.log(error);
                     this.notificationService.showSnackBar(error.message)
     },
     complete: () => {console.info('complete')
                      this.notificationService.showSnackBar('Successfully registered');
                   //   await this.router.navigate(['/']);
                      window.location.reload();
     }
  })
  }

}
