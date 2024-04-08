import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProfileComponent} from "./user_components/profile/profile.component";
import {AddNoteComponent} from "./user_components/add-note/add-note.component";
import {NotesComponent} from "./user_components/notes/notes.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
 // {path: 'navigation', component: NavigationComponent},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: NotesComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: AddNoteComponent, canActivate: [AuthGuardService]}
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
