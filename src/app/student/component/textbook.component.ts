import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { StudentService } from '../services/student.service';
import{TextbookService} from '../services/textbook.service'
import { Student } from '../model/student';
import {Textbook} from '../model/textbook';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-textbook',
   templateUrl: './textbook.component.html',
   styleUrls: ['./student.component.css']
})
export class TextbookComponent implements OnInit {

  //Component properties
   allTextbooks: Textbook[];
   statusCode: number;
   requestProcessing = false;
   textbookIdToUpdate = null;
   processValidation = false;
   id: number; //student id
   studentName: string;

   //Create form
   textbookForm = new FormGroup({
       textbookTitle: new FormControl('', Validators.required)
   });

   //Create constructor to get service instance
   constructor(private router: Router, private route:ActivatedRoute, private studentService: StudentService,
    private textbookService: TextbookService, private location: Location) {
   }

   //Create ngOnInit() and and load students
   ngOnInit(): void {
     this.getAllTextbooksForStudent(); //passed from prev page
     this.getStudentName();
   }

   //Fetch all textbooks for a student
   getAllTextbooksForStudent() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.textbookService.getAllTextbooksByStudentId(this.id)
        .subscribe(
            data => this.allTextbooks = data, //data used to populate table oninit
            errorCode =>  {
              let link = ['/login'];
              this.router.navigate(link);
              this.statusCode = errorCode
            });
   }

   getStudentName(){
     this.studentService.getStudentById(this.id)
     .subscribe(
      data => this.studentName = data.name, //data used to populate table oninit
      errorCode =>  {
        let link = ['/login'];
        this.router.navigate(link);
        this.statusCode = errorCode
      });
   }

   //Handle create textbook
   onTextbookFormSubmit() {
    this.processValidation = true;
	  if (this.textbookForm.invalid) {
	       return; //Validation failed, exit from method.
	  }
	  //Form is valid, now perform create or update
    this.preProcessConfigurations();
	  let textbookTitle = this.textbookForm.get('textbookTitle').value.trim();

      //Handle create student
      let newText = new Textbook(null, textbookTitle, this.id);
	    this.textbookService.createTextbook(newText)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
            this.getAllTextbooksForStudent();
            this.backToCreateTextbook();

			    },
		        errorCode => this.statusCode = errorCode);

   }
   //Delete article
   deleteTextbook(textbookId: number) {
      this.preProcessConfigurations();
      this.textbookService.deleteTextbookById(textbookId)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllTextbooksForStudent();
				    this.backToCreateTextbook();
			    },
		        errorCode => this.statusCode = errorCode);
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;
   }
   //Go back from update to create
   backToCreateTextbook() {
      this.textbookForm.reset();
	    this.processValidation = false;
   }
   goBack(): void {
    this.location.back();
  }
}
