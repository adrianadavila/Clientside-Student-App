import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Student } from '../model/student';
import {Classes} from '../model/classes';
import {AuthenticationService} from '../../login/authentication.service'
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class StudentService {
    //URLs for CRUD operations
    //GET all students
    allStudentsUrl = "http://mvc-backend.us-east-2.elasticbeanstalk.com/user/all-students";
    studentUrl = "http://mvc-backend.us-east-2.elasticbeanstalk.com/user/student";

	//Create constructor to get Http instance
	constructor(private http:Http, private authService:AuthenticationService ) {
  }

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() //implement this
    });

   // private options = {headers: this.authHeaders}
	//Fetch all students
    getAllStudents(): Observable<Student[]> {
      let options = new RequestOptions({ headers: this.authHeaders });
        return this.http.get(this.allStudentsUrl, options)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create student
    createStudent(student: Student):Observable<number> {
	    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: this.authHeaders });
        return this.http.post(this.studentUrl, student, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch student by id
    getStudentById(studentId: number): Observable<Student> {
      // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', studentId.toString());
      let options = new RequestOptions({ headers: this.authHeaders, params: cpParams });
      return this.http.get(this.studentUrl, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
  //Update student info
  //name, major, and classes can get updated.
    updateStudent(student: Student):Observable<number> {
	    //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: this.authHeaders });
        return this.http.put(this.studentUrl, student, options)
               .map(success => success.status)
               .catch(this.handleError);
    }

    //Delete student
    deleteStudentById(studentId: number): Observable<number> {
      //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', studentId.toString());
      let options = new RequestOptions({ headers: this.authHeaders, params: cpParams });
      return this.http.delete(this.studentUrl, options)
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
