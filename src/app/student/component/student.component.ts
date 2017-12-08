import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StudentService } from '../services/student.service';
import { Student } from '../model/student';

import { Router } from '@angular/router';

@Component({
   selector: 'app-student',
   templateUrl: './student.component.html',
   styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  //Component properties
   allStudents: Student[];
   statusCode: number;
   public usrname = null;

   //Create constructor to get service instance
   constructor(private router: Router, private studentService: StudentService) {
   }

   //Create ngOnInit() and and load students
   ngOnInit(): void {
	   this.getAllStudents();
   }

   //Fetch all students
   getAllStudents() {
        this.studentService.getAllStudents()
		  .subscribe(
          data => this.allStudents = data, //data used to populate table oninit
          errorCode =>  {
            let link = ['/login'];
            this.router.navigate(link);
            this.statusCode = errorCode
          });
   }

}
