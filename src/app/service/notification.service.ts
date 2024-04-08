import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {devNull} from "os";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackbar: MatSnackBar) { }

  public showSnackBar(message: string):void{
    this._snackbar.open(message, '', {duration: 5000});
  }

}
