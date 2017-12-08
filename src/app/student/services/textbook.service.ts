import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Textbook } from '../model/textbook';
// import {Classes} from '../model/classes';
import {AuthenticationService} from '../../login/authentication.service'
import { Options } from 'selenium-webdriver/safari';
import { Text } from '@angular/compiler';

@Injectable()
export class TextbookService {
    //URLs for CRUD operations
    //GET all students
    allTextbooksUrl = "http://mvc-backend.us-east-2.elasticbeanstalk.com/user/all-textbook";
    textbooktUrl = "http://mvc-backend.us-east-2.elasticbeanstalk.com/user/textbook";
    textbookByStudentId = "http://mvc-backend.us-east-2.elasticbeanstalk.com/user/student-textbook-collection";
    // allTextbooksUrl = "http://localhost:8080/user/all-textbook";
    // textbooktUrl = "http://localhost:8080/user/textbook";
    // textbookByStudentId = "http://localhost:8080/user/student-textbook-collection";

	//Create constructor to get Http instance
	constructor(private http:Http, private authService:AuthenticationService ) {
  }

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() //implement this
    });

   // private options = {headers: this.authHeaders}
	//Fetch all students
    getAllTextbooks(): Observable<Textbook[]> {
      let options = new RequestOptions({ headers: this.authHeaders });
        return this.http.get(this.allTextbooksUrl, options)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }

    getAllTextbooksByStudentId(studentId: number): Observable<Textbook[]> {
      let cpParams = new URLSearchParams();
      cpParams.set('studentId', studentId.toString());
      let options = new RequestOptions({ headers: this.authHeaders, params: cpParams });
      return this.http.get(this.textbookByStudentId, options)
          .map(this.extractData)
          .catch(this.handleError);

    }


	//Create student
    createTextbook(textbook: Textbook):Observable<number> {
	    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: this.authHeaders });
        return this.http.post(this.textbooktUrl, textbook, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch student by id
    getTextbookById(textbookId: number): Observable<Textbook> {
      // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', textbookId.toString());
      let options = new RequestOptions({ headers: this.authHeaders, params: cpParams });
      return this.http.get(this.textbooktUrl, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
  //Update student info
  //name, major, and classes can get updated.
    updateTextbook(textbook: Textbook):Observable<number> {
	    //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: this.authHeaders });
        return this.http.put(this.textbooktUrl, textbook, options)
               .map(success => success.status)
               .catch(this.handleError);
    }

    //Delete student
    deleteTextbookById(textbookId: number): Observable<number> {
      //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', textbookId.toString());
      let options = new RequestOptions({ headers: this.authHeaders, params: cpParams });
      return this.http.delete(this.textbooktUrl, options)
          .map(success => success.status)
          .catch(this.handleError);
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
