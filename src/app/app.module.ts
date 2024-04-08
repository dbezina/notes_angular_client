import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import { NavigationComponent } from './layout/navigation/navigation.component';
import {MatTooltip} from "@angular/material/tooltip";
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user_components/profile/profile.component';
import { NotesComponent } from './user_components/notes/notes.component';
import { EditUserComponent } from './user_components/edit-user/edit-user.component';
import { AddNoteComponent } from './user_components/add-note/add-note.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    NotesComponent,
    EditUserComponent,
    AddNoteComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltip,
        CommonModule
    ],


  providers: [  provideAnimationsAsync()
                ,provideClientHydration()
                ,authInterceptorProviders
                ,authErrorInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
