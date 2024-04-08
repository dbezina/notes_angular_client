import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {TokenStorageService} from "../../service/token-storage.service";
import {NoteService} from "../../service/note.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  isUserDataLoaded = false;
  user:User;
  selectedFile: File;
  userProfileImage:File;
  previewImageURL: any;

  constructor(private tokenService: TokenStorageService,
              private noteService: NoteService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.user = data;
          this.isUserDataLoaded = true;
        });

    this.imageService.getProfileImage()
      .subscribe(data=> {
          this.userProfileImage = data.imageBytes;}
      );
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageURL = reader.result;
    };
  }

  openEditDialog():void{
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '600px';
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload():void {
    if(this.selectedFile != null){
      this.imageService.uploadImageToUser(this.selectedFile)
        .subscribe({
          next: () => {
            this.notificationService.showSnackBar('Profile image uploaded successfully');
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
  }
}
