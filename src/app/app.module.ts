import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatTableModule} from "@angular/material/table";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {RouterModule, Routes} from "@angular/router";
import { UserUpdateComponent } from './user-update/user-update.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./auth.guard";



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserUpdateComponent,
    AddUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
