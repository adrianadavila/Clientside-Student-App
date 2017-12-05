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
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var StudentService = (function () {
    //Create constructor to get Http instance
    function StudentService(http) {
        this.http = http;
        //URLs for CRUD operations
        //GET all students
        this.allStudentsUrl = "http://localhost:8080/rest/all-students";
        this.studentUrl = "http://localhost:8080/rest/student";
    }
    //Fetch all students
    StudentService.prototype.getAllStudents = function () {
        return this.http.get(this.allStudentsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Create student
    StudentService.prototype.createStudent = function (student) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.post(this.studentUrl, student, options)
            .map(function (success) { return success.status; })
            .catch(this.handleError);
    };
    //Fetch student by id
    StudentService.prototype.getStudentById = function (studentId) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var cpParams = new http_1.URLSearchParams();
        cpParams.set('id', studentId.toString());
        var options = new http_1.RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.get(this.studentUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Update student
    StudentService.prototype.updateStudent = function (student) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.put(this.studentUrl, student, options)
            .map(function (success) { return success.status; })
            .catch(this.handleError);
    };
    //Delete student
    StudentService.prototype.deleteStudentById = function (studentId) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var cpParams = new http_1.URLSearchParams();
        cpParams.set('id', studentId.toString());
        var options = new http_1.RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.delete(this.studentUrl, options)
            .map(function (success) { return success.status; })
            .catch(this.handleError);
    };
    StudentService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    StudentService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return rxjs_1.Observable.throw(error.status);
    };
    return StudentService;
}());
StudentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map