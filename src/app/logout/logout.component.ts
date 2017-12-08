import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import{AuthenticationService} from '../login/authentication.service'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'logout-app',
  template: `
  <button (click)="logout()">Logout</button>
  <h2>Welcome, Professor {{usrname}}<h2>

  `
})
export class LogoutComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router, private authServices: AuthenticationService) { }

  public usrname = null;

  ngOnInit(): void {
    this.getUsername();
  }
    logout(){
      this.authServices.logout()
      let link = ['/login'];
      this.router.navigate(link);
    }
    getUsername(){
      this.usrname = this.authServices.getUsername();
    }
}
