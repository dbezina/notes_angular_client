import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  hide = true;

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    /*  if (this.tokenService.getUser()){
         this.router.navigate(['main']);
      }
    /*  this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });*/
  }


  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
    if (this.tokenService.getUser()) {
      this.router.navigate(['main']);
    }
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
        username: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username, // name of the field
      password: this.loginForm.value.password
    }).subscribe({
      next: async (data) => {
        console.log("data " + JSON.stringify(data));
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);
        console.log("token " + this.tokenService.getToken());
        console.log("user " + this.tokenService.getUser().username);
        this.notificationService.showSnackBar('Successfully authenticated');
        await this.router.navigate(['/']);
        //   window.location.reload();
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showSnackBar(error.message)
      },
      complete: () => {
        console.info('complete');
      }
    })
  }
}
