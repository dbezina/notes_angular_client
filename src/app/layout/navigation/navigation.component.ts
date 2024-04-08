import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',

})

export class NavigationComponent implements  OnInit{
  isLoggedIn = false;
  isDataLoaded = false;
  isVisible = false;
  user: User;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router
  ) {
    console.log("on constructor");
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn){
    //  this.user = this.tokenService.getUser();

     this.userService.getCurrentUser()
        .subscribe(data=>{
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }
  logout(): void{
    this.tokenService.logOut();
      this.router.navigate(['/login']);
  }

}
