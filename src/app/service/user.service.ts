import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

const USER_API = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) {
  }

  getUserById(id: number): Observable<any>{
    return this.http.get(USER_API + id);
  }
  getCurrentUser(): Observable<any>{
    console.log("UserService. getCurrentUser():"+JSON.stringify(this.http.get(USER_API)));
    return this.http.get(USER_API);

  }
  updateUser(user: any): Observable<any>{
    return this.http.post(USER_API + 'update', user);
  }
}
