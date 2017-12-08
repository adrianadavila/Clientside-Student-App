import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from "./student/component/student.component";
import {LoginComponent} from "./login/login.component"; //add this component
import { CanActivateAuthGuard } from './can-activate.authguard';
import { TextbookComponent } from './student/component/textbook.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'students',
    component: StudentComponent, canActivate:[CanActivateAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'textbook/:id',
    component: TextbookComponent, canActivate:[CanActivateAuthGuard]
  },
  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' //what?

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
