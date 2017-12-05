import{StudentService} from '../app/student/services/student.service';

import { async, TestBed , getTestBed, inject} from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
    Headers, BaseRequestOptions, Response,
    HttpModule, Http, XHRBackend, RequestMethod
  } from '@angular/http';

 import {ResponseOptions} from '@angular/http';
 import {MockBackend, MockConnection} from '@angular/http/testing';
import {Student} from '../app/student/model/student';
import {Classes} from '../app/student/model/classes';
import {AuthenticationService} from '../app/login/authentication.service'


describe('Student Service', function () {
  let mockBackend: MockBackend;

  beforeEach(async()=>{
    TestBed.configureTestingModule({
      providers:[
        StudentService,
        MockBackend,
        BaseRequestOptions,
        AuthenticationService,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      imports:[
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

    it('should get students', done =>{
      let studentService: StudentService;
      getTestBed().compileComponents().then(()=>{
        mockBackend.connections.subscribe(
          (connection:MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {
                    id: 26,
                    name: 'Katy',
                    major: 'Music',
                    classes: {
                      class_1: 'art',
                      class_2: 'art1',
                      class_3: 'art2',
                      class_4: 'art3'
                    }
                  }
                ]
              })
            ))
          }
        )
        studentService = getTestBed().get(StudentService);
        expect(studentService).toBeDefined();

        studentService.getAllStudents().subscribe((students: Student[])=>{
          expect(students.length).toBeDefined();
          expect(students.length).toEqual(1);
          expect(students[0].id).toEqual(26);
          done();
        })
      })
    })


    it('should run a test that finishes eventually', done => {
      // kick off an asynchronous call in the background
      setTimeout(() => {
        console.log('now we are done');
        done();
      }, 500);
    })

});



