
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { StudentComponent }  from './student/component/student.component';
import { StudentService } from './student/services/student.service';
import{LoginComponent} from './login/login.component';
import{AuthenticationService} from './login/authentication.service';
import { CanActivateAuthGuard } from './can-activate.authguard';
import{LogoutComponent} from './logout/logout.component'
import {TextbookComponent} from './student/component/textbook.component';
import {TextbookService} from './student/services/textbook.service';

//recently added routing module
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [
      BrowserModule,
      HttpModule,
      ReactiveFormsModule,
      FormsModule,
      AppRoutingModule
    ],
    declarations: [
      AppComponent,
      StudentComponent,
      LoginComponent,
      LogoutComponent,
      TextbookComponent
    ],
    providers: [
        StudentService,
        TextbookService,
        AuthenticationService,
        CanActivateAuthGuard
    ],
    bootstrap: [
          AppComponent
    ]
})
export class AppModule { }
