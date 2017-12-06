import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
    //URLs for CRUD operations
    private authUrl = "http://mvc-backend.us-east-2.elasticbeanstalk.com/oauth/token";
    private serverUsername = "studentapp";
    private serverPassword = "secret";
    private grantType = "password";
    private clientUsrName: string;


	//Create constructor to get Http instance
	constructor(private http:Http) {
	}

  login(clientUsername: string, clientPassword: string): Observable<boolean> {
    let headers = new Headers ({'Content-Type': "application/x-www-form-urlencoded"});
    headers.append("Authorization", "Basic " + btoa(this.serverUsername + ":" + this.serverPassword));
    //headers.append("Access-Control-Allow-Headers", "Content-Type x-xsrf-token"); //u

    let options = new RequestOptions({ headers: headers });

    let data ='grant_type=password&username='+clientUsername+'&password='+clientPassword;
    return this.http.post(this.authUrl, data, options)
      .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json() && response.json().access_token;
          if (token) {
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify({ username: clientUsername, token: token }));
              // return true to indicate successful login
              return true;
          } else {
              // return false to indicate failed login
              return false;
          }
      })
      .catch(this.handleError);
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  getUsername(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let name = currentUser.username;
    return name;
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  private extractData(res: Response) {
    let body = res.json();
      return body;
  }
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
