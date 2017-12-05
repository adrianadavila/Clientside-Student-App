"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var student_service_1 = require("./student.service");
var student_1 = require("./student");
var StudentComponent = (function () {
    //Create constructor to get service instance
    function StudentComponent(studentService) {
        this.studentService = studentService;
        this.requestProcessing = false;
        this.studentIdToUpdate = null;
        this.processValidation = false;
        //Create form
        this.studentForm = new forms_1.FormGroup({
            name: new forms_1.FormControl('', forms_1.Validators.required),
            major: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    //Create ngOnInit() and and load students
    StudentComponent.prototype.ngOnInit = function () {
        this.getAllStudents();
    };
    //Fetch all students
    StudentComponent.prototype.getAllStudents = function () {
        var _this = this;
        this.studentService.getAllStudents()
            .subscribe(function (data) { return _this.allStudents = data; }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    //Handle create and update student
    StudentComponent.prototype.onStudentFormSubmit = function () {
        var _this = this;
        this.processValidation = true;
        if (this.studentForm.invalid) {
            return; //Validation failed, exit from method.
        }
        //Form is valid, now perform create or update
        this.preProcessConfigurations();
        var name = this.studentForm.get('name').value.trim();
        var major = this.studentForm.get('major').value.trim();
        if (this.studentIdToUpdate === null) {
            //Handle create student
            console.log('it WAS NULL');
            var student = new student_1.Student(null, name, major);
            this.studentService.createStudent(student)
                .subscribe(function (successCode) {
                _this.statusCode = successCode;
                _this.getAllStudents();
                _this.backToCreateStudent();
            }, function (errorCode) { return _this.statusCode = errorCode; });
        }
        else {
            //Handle update student
            var student = new student_1.Student(this.studentIdToUpdate, name, major);
            this.studentService.updateStudent(student)
                .subscribe(function (successCode) {
                _this.statusCode = successCode;
                _this.getAllStudents();
                _this.backToCreateStudent();
            }, function (errorCode) { return _this.statusCode = errorCode; });
        }
    };
    //Load article by id to edit
    StudentComponent.prototype.loadStudentToEdit = function (studentId) {
        var _this = this;
        this.preProcessConfigurations();
        this.studentService.getStudentById(studentId)
            .subscribe(function (res) {
            _this.studentIdToUpdate = res.id;
            _this.studentForm.setValue({ name: res.name, major: res.major });
            _this.processValidation = true;
            _this.requestProcessing = false;
        }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    //Delete article
    StudentComponent.prototype.deleteStudent = function (studentId) {
        var _this = this;
        this.preProcessConfigurations();
        this.studentService.deleteStudentById(studentId)
            .subscribe(function (successCode) {
            _this.statusCode = successCode;
            _this.getAllStudents();
            _this.backToCreateStudent();
        }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    //Perform preliminary processing configurations
    StudentComponent.prototype.preProcessConfigurations = function () {
        this.statusCode = null;
        this.requestProcessing = true;
    };
    //Go back from update to create
    StudentComponent.prototype.backToCreateStudent = function () {
        this.studentIdToUpdate = null;
        this.studentForm.reset();
        this.processValidation = false;
    };
    return StudentComponent;
}());
StudentComponent = __decorate([
    core_1.Component({
        selector: 'app-student',
        moduleId: module.id,
        templateUrl: './student.component.html',
        styleUrls: ['./student.component.css']
    }),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentComponent);
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.component.js.map