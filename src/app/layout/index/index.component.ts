import {Component, OnInit} from '@angular/core';
import {Note} from "../../models/note";
import {User} from "../../models/user";
import {NoteService} from "../../service/note.service";
import {UserService} from "../../service/user.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {computeStyles} from "@popperjs/core";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  isNotesLoaded = false;
  notes: Note[];
  isUserDataLoaded = false;
  user: User;

  constructor(
    private noteService: NoteService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageUploadService
  ) {
   // console.log("index.html");
  }

  ngOnInit(): void {

    console.log("userService.getCurrentUser "+ JSON.stringify(this.userService.getCurrentUser()))
    console.log("user "+this.user)

    this.noteService.getAllNotes()
      .subscribe(data => {
        console.log(data);
        this.notes = data;
        this.getCommentsToNotes(this.notes);
        this.getImagesToNotes(this.notes);
        this.isNotesLoaded = true;
      });
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });
  }

  getImagesToNotes(notes: Note[]):void{
    notes.forEach( p => {
      this.imageService.getImageToNote(p.id)
        .subscribe( data =>{
          p.image = data.imageBytes;
      })
    });
  }

  getCommentsToNotes(notes: Note[]):void{
    notes.forEach( p => {
      this.commentService.getCommentsToNote(p.id)
        .subscribe( data =>{
          p.comments = data;
        })
    });
  }
  postComment(message: string, noteId: number, noteIndex: number): void {
    const note = this.notes[noteIndex];
    this.commentService.addCommentToNote(noteId, message)
      .subscribe(data => {
        console.log(data);
        note.comments?.push(data);
        this.notificationService.showSnackBar("comment added");
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  deleteComment(commentId: number, noteIndex: number, commentIndex: number):void {
    const note = this.notes[noteIndex];
    const comment = note.comments[commentIndex];
    if (this.user.username === comment.username){
      this.commentService.deleteCommentByUser(commentId)
        .subscribe(data => {
          console.log(data);
          this.notes[noteIndex].comments.slice(commentIndex,1);
        });
    }
    else {
      this.commentService.deleteCommentByNote(commentId, note.id)
        .subscribe(data => {
          console.log(data);
          this.notes[noteIndex].comments.slice(commentIndex, 1);
        });
    }
  }
}
