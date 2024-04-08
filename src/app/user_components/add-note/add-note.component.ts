import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {TokenStorageService} from "../../service/token-storage.service";
import {NoteService} from "../../service/note.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {UserService} from "../../service/user.service";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../models/note";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent implements OnInit{

  public addNoteForm: FormGroup;
  isUserDataLoaded = false;
  isNoteCreated = false;
  user:User;
  note:Note;
  selectedFile: File;
  NoteImage:File;
  previewImageURL: any;
  noteId: number = -1;

  constructor(private tokenService: TokenStorageService,
              private noteService: NoteService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService,
              public fb:FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.user = data;
          this.isUserDataLoaded = true;
        });
   this.addNoteForm =  this.createNoteForm();

  }
  createNoteForm(): FormGroup{
    return this.fb.group({
      title:    ['', Validators.compose([Validators.required])],
      memo:    ['', Validators.compose([Validators.required])]
      }
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
    dialogUserEditConfig.width = '400px';
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

  onUpdate():void {
    console.log("onUpload ");
    if (this.selectedFile != null && this.noteId != -1) {
      this.noteService.delete(this.noteId).subscribe(()=>{
        this.isNoteCreated = false;
        this.submitNote();
      });
    }
  }


  submitNote():void {
    console.log("submitNote addNoteForm "+ this.addNoteForm.value.title+" " + this.addNoteForm.value.memo);
  /*  this.note.title = this.addNoteForm.value.title;
    this.note.memo = this.addNoteForm.value.memo;
    console.log("submitNote  this.note "+ this.note);*/

   this.noteService.createNote( {
     title: this.addNoteForm.value.title,
     memo: this.addNoteForm.value.memo,
     username : this.user.username
   })
     .subscribe((data)=> {
       this.notificationService.showSnackBar("Note is created");
       this.isNoteCreated = true;
       this.noteId = data.id;
     /*  console.log(JSON.stringify(data) );
       console.log(this.noteId );*/
       if(this.selectedFile != null) {
         this.imageService.uploadImageToNote(this.selectedFile, this.noteId )
           .subscribe({
               next: () => {
                 this.notificationService.showSnackBar('Note image uploaded successfully');
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
     });


  }

  /*onUpdate() {
    this.noteService.
  }*/
}
