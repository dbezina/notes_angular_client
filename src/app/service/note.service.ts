import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "../models/note";
import {Observable} from "rxjs";

const NOTE_API = 'http://localhost:8080/api/note/';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }
  createNote(note:Note):Observable<any>{
    return this.http.post(NOTE_API+'create',note);
  }
  getAllNotes():Observable<any>{
    return this.http.get(NOTE_API+'all');
  }

  getNotesForCurrentUser():Observable<any>{
    return this.http.get(NOTE_API+'user/notes');
  }

  delete(id:number):Observable<any>{
    return this.http.post(NOTE_API+id+'/delete', null);
  }

}
