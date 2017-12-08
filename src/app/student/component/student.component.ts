import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StudentService } from '../services/student.service';
import { Student } from '../model/student';
import {Classes} from '../model/classes';
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
  //  requestProcessing = false;
  //  studentIdToUpdate = null;
  //  classesIdToUpdate = null; //update classes
  //  processValidation = false;

   //Create form
  //  studentForm = new FormGroup({
  //      name: new FormControl('', Validators.required),
  //      major: new FormControl('', Validators.required),
  //      class_1: new FormControl('', Validators.required),
  //      class_2: new FormControl('', Validators.required),
  //      class_3: new FormControl('', Validators.required),
  //      class_4: new FormControl('', Validators.required)
  //  });

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
   //Handle create and update student
  //  onStudentFormSubmit() {
  //   this.processValidation = true;
	//   if (this.studentForm.invalid) {
	//        return; //Validation failed, exit from method.
	//   }
	//   //Form is valid, now perform create or update
  //   this.preProcessConfigurations();
	//   let name = this.studentForm.get('name').value.trim();
  //   let major = this.studentForm.get('major').value.trim();
  //   let class_1 = this.studentForm.get('class_1').value.trim();
  //   let class_2 = this.studentForm.get('class_2').value.trim();
  //   let class_3 = this.studentForm.get('class_3').value.trim();
  //   let class_4 = this.studentForm.get('class_4').value.trim();


	//   if (this.studentIdToUpdate === null) {
  //     //Handle create student
  //     let classes = new Classes(class_1, class_2, class_3, class_4, null);
  //     let student= new Student(null, name, major, classes);

	//     this.studentService.createStudent(student)
	//       .subscribe(successCode => {
	// 	        this.statusCode = successCode;
	// 			    this.getAllStudents();
	// 				  this.backToCreateStudent();
	// 		    },
	// 	        errorCode => this.statusCode = errorCode);
	//     } else {
  //        //Handle update student
  //         let classes = new Classes(class_1, class_2, class_3, class_4, this.classesIdToUpdate);
  //         let student= new Student(this.studentIdToUpdate, name, major, classes);

  //         this.studentService.updateStudent(student)
  //           .subscribe(successCode => {
  //               this.statusCode = successCode;
  //               this.getAllStudents();
  //               this.backToCreateStudent();
  //           },
  //             errorCode => this.statusCode = errorCode);
	//     }
  //  }

  //  //Load article by id to edit
  //  loadStudentToEdit(studentId: number) {
  //     this.preProcessConfigurations();
  //     this.studentService.getStudentById(studentId)
	//       .subscribe(res => {
  //           this.studentIdToUpdate = res.id;
  //           this.classesIdToUpdate = res.classes.id;
  //           this.studentForm.setValue({ name: res.name, major: res.major,
  //             class_1: res.classes.class_1, class_2: res.classes.class_2,
  //             class_3: res.classes.class_3, class_4: res.classes.class_4 });
  //           this.processValidation = true;
  //           this.requestProcessing = false;

	// 	    },
	// 	     errorCode =>  this.statusCode = errorCode);
  //  }
  //  //Delete article
  //  deleteStudent(studentId: number) {
  //     this.preProcessConfigurations();
  //     this.studentService.deleteStudentById(studentId)
	//       .subscribe(successCode => {
	// 	            this.statusCode = successCode;
	// 			    this.getAllStudents();
	// 			    this.backToCreateStudent();
	// 		    },
	// 	        errorCode => this.statusCode = errorCode);
  //  }
  //  //Perform preliminary processing configurations
  //  preProcessConfigurations() {
  //     this.statusCode = null;
	//   this.requestProcessing = true;
  //  }
  //  //Go back from update to create
  //  backToCreateStudent() {
  //     this.studentIdToUpdate = null;
  //     this.studentForm.reset();
	//   this.processValidation = false;
  //  }
}
