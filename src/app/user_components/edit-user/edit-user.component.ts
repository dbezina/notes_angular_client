import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements  OnInit{

  public profileEditForm: FormGroup;

  constructor(private dialogRef : MatDialogRef<EditUserComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService
              )
  {
  }
  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup{
    return this.fb.group({
      firstName: [
        this.data.user.firstname,
        Validators.compose([Validators.required])
      ],
      lastName: [
        this.data.user.lastname,
        Validators.compose([Validators.required])
      ],
      bio: [
        this.data.user.bio,
        Validators.compose([Validators.required])
      ]
      }
    );
  }

  submit():void{
   // console.log("updated user: "+this.updateUser().firstname + " "+ this.updateUser().lastname+ " "+ this.updateUser().bio );

    this.userService.updateUser(this.updateUser())
      .subscribe({
          next:  () => {
            this.notificationService.showSnackBar("updated successfully");
            this.dialogRef.close();
          },
          error: (error) => {
            console.log(error);
            this.notificationService.showSnackBar(error.message)
          },
          complete: () => {
            console.info('complete');
          }
        }
      );
  }

  private updateUser():User{
    this.data.user.firstname = this.profileEditForm.value.firstName;
    this.data.user.lastname = this.profileEditForm.value.lastName;
    this.data.user.bio = this.profileEditForm.value.bio;
    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
