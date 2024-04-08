import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const COMMENT_API = 'http://localhost:8080/api/comment/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addCommentToNote(noteId: number, text: String):Observable<any>{
    return this.http.post(COMMENT_API + noteId +'/create',{text: text});
  }

  getCommentsToNote(noteId:number):Observable<any>{
    return this.http.get(COMMENT_API + noteId +'/all');
  }
  deleteCommentByUser(commentId: number):Observable<any>{
    return this.http.post(COMMENT_API +commentId +'/deleteByUser', null);
  }

  deleteCommentByNote(commentId: number, noteId: number) {
    return this.http.post(COMMENT_API +commentId +'/deleteByNote/' + noteId, null);
  }
}
