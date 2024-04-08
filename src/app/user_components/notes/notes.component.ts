import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {NoteService} from "../../service/note.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {CommentService} from "../../service/comment.service";
import {User} from "../../models/user";
import {Note} from "../../models/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit{
  isUserDataLoaded = false;
  user: User;
  isNotesLoaded = false;
  notes: Note[];

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private myNotesService: NoteService,
              private imageService: ImageUploadService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.user = data;
          this.isUserDataLoaded = true;
        });

    this.myNotesService.getNotesForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.notes = data;
        this.getCommentsToNotes(this.notes);
        this.getImagesToNotes(this.notes);
        this.isNotesLoaded = true;
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

    console.log(note);
    this.commentService.addCommentToNote(noteId, message)
      .subscribe(data => {
        console.log(data);
        note.comments?.push(data);
      });
  }

  deleteComment(commentId: number, noteIndex: number , commentIndex: number):void{
  //  const commentId : number = this.notes[noteId].comments[commentNumber].id;
    this.commentService.deleteCommentByUser(commentId)
     .subscribe(data => {
       console.log(data);
       this.notes[noteIndex].comments.slice(commentIndex,1);
    });
  }
  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  deleteNote(noteId: number, noteIndex: number):void {
    this.myNotesService.delete(noteId)
      .subscribe((data) =>{
        console.log(data);
        this.notificationService.showSnackBar("note was deleted");
        this.notes.slice(noteIndex,1);
      });


  }
}
